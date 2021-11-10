<template>
  <file-uploader-drop>
    <div class="text-center">
      <file-uploader-btn>文件</file-uploader-btn>
      <file-uploader-btn :directory="true">文件夹</file-uploader-btn>
      <span class="mx-5">或</span>
      <file-uploader-link></file-uploader-link>
    </div>
    <file-uploader-list></file-uploader-list>
    <div class="text-right"></div>
  </file-uploader-drop>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import OSS from 'ali-oss'
import FileUploaderBtn from '@/pages/_components/FileUploader/FileBtn.vue'
import FileUploaderLink from '@/pages/_components/FileUploader/FileLink.vue'
import FileUploaderDrop from '@/pages/_components/FileUploader/FileDrop.vue'
import FileUploaderList from '@/pages/_components/FileUploader/FileList.vue'
import UFile from '@/pages/_components/FileUploader/UFile'
import FileUploaderImplement from '@/pages/_components/FileUploader/FileUploaderImplement'

const isServer = typeof window === 'undefined'
const ie10plus = isServer ? false : window.navigator.msPointerEnabled
const defaults = {
  chunkSize: 1024 * 1024,
  forceChunkSize: false,
  simultaneousUploads: 3,
  singleFile: false,
  fileParameterName: 'file',
  progressCallbacksInterval: 500,
  speedSmoothingFactor: 0.1,
  query: {},
  headers: {},
  withCredentials: false,
  preprocess: null,
  method: 'multipart',
  testMethod: 'GET',
  uploadMethod: 'POST',
  prioritizeFirstAndLastChunk: false,
  allowDuplicateUploads: false,
  target: '/',
  testChunks: true,
  maxChunkRetries: 0,
  chunkRetryInterval: null,
  permanentErrors: [404, 415, 500, 501],
  successStatuses: [200, 201, 202],
  onDropStopPropagation: false,
  initFileFn: null,
  checkChunkUploadedByResponse: null,
  initialPaused: false,
  processResponse(response: any, cb: any) {
    cb(null, response)
  },
  processParams(params: any) {
    return params
  },
}
function generateUniqueIdentifier(file: any): string {
  const relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name
  return file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/gim, '')
}
function toUrlParams(obj: any): string {
  return (
    '{' +
    Object.keys(obj)
      .map((k) => `"${k}":${obj[k]}`)
      .join(',') +
    '}'
  )
}

@Component({
  components: { FileUploaderList, FileUploaderDrop, FileUploaderBtn, FileUploaderLink },
  provide() {
    return {
      FileUploader: this,
    }
  },
  async asyncData({ app }): Promise<any> {
    const items = await app.$api.datum.getList()
    const options = [
      {
        value: '选项1',
        label: '黄金糕',
      },
      {
        value: '选项2',
        label: '双皮奶',
      },
    ]
    return { options }
  },
})
export default class FileUploader extends Vue implements FileUploaderImplement {
  client: OSS | null = null
  token: any = null
  opts = defaults
  files: UFile[] = []
  options = []
  private initClientPromise: null | Promise<any> = null
  private refreshSTSTokenPromise: null | Promise<any> = null

  public onUpload(): void {
    // 获取目前允许上传的数量
    const allowedNumber: number = this.getUploadingNumber()
    if (allowedNumber === 0) {
      return
    }
    let started = false
    for (let num = 1; num <= allowedNumber; num++) {
      // 启动下一个文件上传
      started = this.uploadNextFile() || started
      // 启动失败则停止
      if (!started) {
        break
      }
    }
  }
  public addFiles(files: FileList | string) {
    if (typeof files === 'string') {
      const file = new UFile(files)
      this.files.push(file)
      return
    }
    const _files: UFile[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // Uploading empty file IE10/IE11 hangs indefinitely
      // Directories have size `0` and name `.`
      // Ignore already added files
      if ((!ie10plus || (ie10plus && file.size > 0)) && !(file.size % 4096 === 0 && (file.name === '.' || (file as any).fileName === '.'))) {
        const uniqueIdentifier = generateUniqueIdentifier(file)
        if (!this.getFromUniqueIdentifier(uniqueIdentifier)) {
          const _file = new UFile(file)
          _file.uniqueIdentifier = uniqueIdentifier
          _files.push(_file)
        }
      }
    }
    for (const file of _files) {
      if (this.opts.singleFile && this.files.length > 0) {
        this.removeFile(this.files[0])
      }
      this.files.push(file)
    }
  }
  public removeFile(file: UFile): void {
    const index = this.files.findIndex((f) => f === file)
    if (index >= 0) {
      this.files.splice(index, 1)
    }
  }
  getFromUniqueIdentifier(uniqueIdentifier: string): UFile | undefined {
    return this.files.find((file) => file.uniqueIdentifier === uniqueIdentifier)
  }

  protected refreshSTSToken(): Promise<any> {
    if (this.refreshSTSTokenPromise === null) {
      this.refreshSTSTokenPromise = this.$api.datum.getOssToken().then((data) => {
        this.refreshSTSTokenPromise = null
        return data
      })
    }
    return this.refreshSTSTokenPromise
  }
  protected initClient(): Promise<void> {
    if (this.initClientPromise === null) {
      this.initClientPromise = this.refreshSTSToken().then((token: any) => {
        this.token = token
        this.client = new OSS({
          // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
          region: this.token.region,
          // 填写Bucket名称。
          bucket: this.token.bucket,
          // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
          accessKeyId: token.access_key_id,
          accessKeySecret: token.access_key_secret,
          // 从STS服务获取的安全令牌（SecurityToken）。
          stsToken: token.security_token,
          refreshSTSToken: async () => {
            // 向您搭建的STS服务获取临时访问凭证。
            const token = await this.refreshSTSToken()
            this.token = token
            return {
              accessKeyId: token.access_key_id,
              accessKeySecret: token.access_key_secret,
              stsToken: token.security_token,
            }
          },
          // 刷新临时访问凭证的时间间隔，单位为毫秒。
          refreshSTSTokenInterval: 300000,
        })
        this.initClientPromise = null
      })
    }
    return this.initClientPromise
  }
  protected createCallback(customValue: any) {
    return {
      url: this.token.callbackUrl,
      contentType: 'application/json',
      body: toUrlParams({
        /* eslint no-template-curly-in-string: [0] */
        bucket: '${bucket}',
        object: '${object}',
        etag: '${etag}',
        size: '${size}',
        mimeType: '${mimeType}',
        user: '${x:user}',
        resourceid: '${x:resourceid}',
        name: '${x:name}',
        md5: '${x:md5}',
        id: '${x:id}',
      }),
      customValue,
    }
  }
  protected async uploadFile(uFile: UFile): Promise<void> {
    uFile.resourceId = this.$route.params.id || 'd31d2d6e-1ce9-499c-b0d5-e0ff960914af'
    // 上传 link 文件
    if (!uFile.isOssFile()) {
      return await this.addFileToDatum(uFile)
    }
    // 上传 OSS 文件
    if (!this.client) {
      await this.initClient()
    }
    uFile.path = this.token.ossPath + uFile.id
    const { id, name, hash, file, path } = uFile
    const userId = this.$store.getters['user/username']
    const objectOption: OSS.PutObjectOptions = {
      callback: this.createCallback({
        user: userId,
        resourceid: uFile.resourceId,
        name,
        md5: hash,
        id,
      }),
    }
    await this.client!.put(path, file, objectOption)
    await this.addFileToDatum(uFile)
  }
  protected async addFileToDatum(uFile: UFile) {
    const { id, bytes, name, mediaType, hash, path, description, resourceId } = uFile
    await this.$api.datum.addFile(resourceId, {
      id,
      oss_tag: uFile.file ? 1 : 0,
      content: {
        name,
        path,
        hash,
        bytes,
        mediatype: mediaType,
        description,
      },
    })
  }
  // 每次启动一个，需要返回告知启动成功
  protected uploadNextFile(): boolean {
    for (const uFile of this.files) {
      if (uFile.isPending()) {
        uFile.uploadStart()
        this.uploadFile(uFile)
          .then(() => {
            uFile.uploaded()
            // 完成当前的上传之后，启动下一个上传
            this.uploadNextFile()
          })
          .catch((e) => {
            uFile.uploadError(e)
          })
        return true
      }
    }
    // 已经没有需要启动的文件，检查所有的是否完成（包含失败）
    const everyDone = this.files.every((file) => file.isDone())
    if (everyDone && this.files.length) {
      // All chunks have been uploaded, complete
      this.$message.success('文件上传完毕')
      this.$emit('onComplete')
    }
    // 返回 !everySuccess 判断是否已经启动成功
    return !everyDone
  }
  // 正在上传的数量
  protected getUploadingNumber(): number {
    let allowedNumber = this.opts.simultaneousUploads
    for (const file of this.files) {
      if (file.isUploading()) {
        allowedNumber--
        if (allowedNumber <= 0) {
          break
        }
      }
    }
    return allowedNumber
  }
}
</script>
