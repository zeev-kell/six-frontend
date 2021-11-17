<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import OSS from 'ali-oss'
import FileUploaderBtn from '@/pages/_components/FileUploader/components/FileBtn.vue'
import FileUploaderLink from '@/pages/_components/FileUploader/components/FileLink.vue'
import FileUploaderDrop from '@/pages/_components/FileUploader/components/FileDrop.vue'
import FileUploaderList from '@/pages/_components/FileUploader/components/FileList.vue'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import FileUploaderImplement from '@/pages/_components/FileUploader/FileUploaderImplement'
import { DatumItemModel } from '@/types/model/Datum'

const isServer = typeof window === 'undefined'
const ie10plus = isServer ? false : window.navigator.msPointerEnabled
const MAX_SIZE = 2 * 1024 * 1024

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
})
export default class FileUploaderMixin extends Vue implements FileUploaderImplement {
  private client: OSS | null = null
  private token: any = null
  error = false
  opts = {
    simultaneousUploads: 3,
    singleFile: false,
  }
  files: UFile[] = []
  errorFiles: UFile[] = []
  fields: any[] = []
  options: any[] = []
  private initClientPromise: null | Promise<any> = null
  private refreshSTSTokenPromise: null | Promise<any> = null
  get hasFile(): boolean {
    return this.files.length > 0
  }
  get uploading(): boolean {
    return this.files.some((f) => f.isUploading())
  }

  public async onUpload(): Promise<void> {
    this.error = false
    await this.validateItem()
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
      const file = new UFile(files, this)
      if (this.opts.singleFile) {
        this.files = [file]
      } else {
        this.files.push(file)
      }
      return
    }
    const _files: UFile[] = []
    let ignoreNum = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // Uploading empty file IE10/IE11 hangs indefinitely
      // Directories have size `0` and name `.`
      // Ignore already added files
      if ((!ie10plus || (ie10plus && file.size > 0)) && !(file.size % 4096 === 0 && (file.name === '.' || (file as any).fileName === '.'))) {
        const uniqueIdentifier = generateUniqueIdentifier(file)
        if (!this.getFromUniqueIdentifier(uniqueIdentifier) && file.size <= MAX_SIZE) {
          const _file = new UFile(file, this)
          _file.uniqueIdentifier = uniqueIdentifier
          _files.push(_file)
        } else {
          ignoreNum++
        }
      }
    }
    for (const file of _files) {
      if (this.opts.singleFile && this.files.length > 0) {
        this.removeFile(this.files[0])
      }
      this.files.push(file)
    }
    if (ignoreNum) {
      this.$message.warning(`忽略${ignoreNum}个文件，请不要上传相同文件或者大于2M的文件`)
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
    uFile.resourceId = this.$route.params.id
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
    // 关于进度条，只有分片上传才有
    uFile.progress = 0
    await this.client!.put(path, file, objectOption)
    uFile.progress = 1
    await this.addFileToDatum(uFile)
  }
  protected async addFileToDatum(uFile: UFile) {
    const { id, bytes, name, mediaType, hash, path, description, resourceId, schema } = uFile
    await this.$api.datum.addFile(resourceId, {
      id,
      oss_tag: uFile.file ? 1 : 0,
      content: {
        name,
        path,
        hash,
        bytes,
        schema,
        mediatype: mediaType,
        description,
      } as DatumItemModel,
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
            this.$emit('upload.file.success')
          })
          .catch((e) => {
            uFile.uploadError(e)
            this.errorFiles.push(uFile)
            this.error = true
          })
          .then(() => {
            // 完成当前的上传之后，启动下一个上传
            this.uploadNextFile()
          })
        return true
      }
    }
    // 已经没有需要启动的文件，检查所有的是否完成（包含失败）
    const everyDone = this.files.every((file) => file.isDone())
    if (everyDone && this.files.length) {
      // TODO 修改 计算MD5 的时候完成上传
      if (this.error) {
        this.$message.warning('部分文件发生错误，请检查...')
      } else {
        // All chunks have been uploaded, complete
        this.$message.success('文件上传完毕')
      }
      this.$emit('upload.file.complete')
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

  protected async validateItem(): Promise<void> {
    if (this.fields.length === 0) {
      return
    }
    for (const field of this.fields) {
      // eslint-disable-next-line no-useless-call
      await field.validateItem.call(field)
    }
  }
  created() {
    this.$on('upload.file.addField', (field: any) => {
      if (field) {
        this.fields.push(field)
      }
    })
    this.$on('upload.file.removeField', (field: any) => {
      if (field) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
    this.$on('upload.file.initHash', (uFile: UFile) => {
      const items: any[] = this.$store.getters['datum/items']
      if (items.findIndex((f) => f.hash === uFile.hash) !== -1) {
        uFile.uploadRefuse('已经存在相同MD5的文件')
      } else {
        // TODO
        uFile.status = 'pending'
      }
    })
  }
}
</script>
