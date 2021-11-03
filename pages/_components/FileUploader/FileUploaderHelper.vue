<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import OSS from 'ali-oss'
import { uuid4 } from '@/utils/uuid'
import { getFileMd5 } from '@/utils/file-md5'
import { getMimeType } from '@/pages/application/datum/_components/mime'
import { Uploader } from '@/pages/_components/FileUploader/components/Uploader'
import utils from '@/pages/_components/FileUploader/components/utils'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import FileUploaderImplement from './FileUploaderImplement'

const isServer = typeof window === 'undefined'
const ie10plus = isServer ? false : window.navigator.msPointerEnabled
const support = (function () {
  if (isServer) {
    return false
  }
  let sliceName = 'slice'
  let _support = !!(window.File && window.Blob && window.FileList)
  let bproto: any = null
  if (_support) {
    bproto = window.Blob.prototype
    ;['slice', 'webkitSlice', 'mozSlice'].forEach((n: string) => {
      if (bproto[n]) {
        sliceName = n
        return false
      }
    })
    _support = !!bproto[sliceName]
  }
  if (_support) Uploader.sliceName = sliceName
  bproto = null
  return _support
})()
const supportDirectory = (function () {
  if (isServer) {
    return false
  }
  let input: any = window.document.createElement('input')
  input.type = 'file'
  const sd = 'webkitdirectory' in input || 'directory' in input
  input = null
  return sd
})()
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

@Component
export default class FileUploaderHelper extends Vue implements FileUploaderImplement {
  client: OSS | null = null
  token: any = null
  isFolder: boolean | undefined
  parent: any
  isRoot: any
  uploader!: Uploader
  opts = defaults
  files: any[] = []
  fileList: any[] = []
  filePaths = {}

  async initClient(): Promise<void> {
    const token = await this.$api.datum.getOssToken()
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
        const token = await this.$api.datum.getOssToken()
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
  }
  getFromUniqueIdentifier(uniqueIdentifier: string): boolean | UFile {
    for (const file of this.files) {
      if (file.uniqueIdentifier === uniqueIdentifier) {
        return file
      }
    }
    return false
  }

  addFiles(files: FileList, evt: Event) {
    const _files: UFile[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // Uploading empty file IE10/IE11 hangs indefinitely
      // Directories have size `0` and name `.`
      // Ignore already added files
      if ((!ie10plus || (ie10plus && file.size > 0)) && !(file.size % 4096 === 0 && (file.name === '.' || (file as any).fileName === '.'))) {
        const uniqueIdentifier = generateUniqueIdentifier(file)
        if (!this.getFromUniqueIdentifier(uniqueIdentifier)) {
          const _file = new UFile(this, file, this)
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
  removeFile(file: UFile) {
    if (file.isFolder) {
      while (file.files.length) {
        const f = file.files[file.files.length - 1]
        this._removeFile(f)
      }
    }
    this._removeFile(file)
  }
  onUpload(preventEvents?: boolean) {
    // Make sure we don't start too many uploads at once
    const ret: number | boolean = this._shouldUploadNext()
    if (ret === false) {
      return
    }
    let started = false
    for (let num = 1; num <= this.opts.simultaneousUploads - (ret as number); num++) {
      started = this.uploadNextChunk(!preventEvents) || started
      if (!started && preventEvents) {
        break
      }
    }
  }
  async uploadFile(file: File): Promise<void> {
    if (!this.client) {
      await this.initClient()
    }
    const engineId = uuid4()
    const resourceId = this.$route.params.id || '27b4ea16-6b05-4e2d-a97b-8cdd8c318955'
    const userId = this.$store.getters['user/username']
    const { size, name } = file
    const path = this.token.ossPath + engineId
    const hash = await getFileMd5(file)
    const mediaType = getMimeType(name)
    const objectOption: OSS.PutObjectOptions = {
      callback: {
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
        customValue: {
          user: userId,
          resourceid: resourceId,
          name,
          md5: hash,
          id: engineId,
        },
      },
    }
    try {
      await this.client!.put(path, file, objectOption)
      await this.$api.datum.addFile(resourceId, {
        id: engineId,
        oss_tag: 1,
        content: {
          name,
          path,
          hash,
          bytes: size,
          mediatype: mediaType,
          description: 'description',
        },
      })
      this.$message({
        type: 'success',
        message: '上传成功!',
      })
    } catch (e) {
      console.log(e)
      this.$message({
        type: 'error',
        message: '上传失败！',
      })
    }
  }
  uploadNextChunk(preventEvents: boolean) {
    for (const file of this.files) {
      if (!file.paused && file.status === UFile.STATUS.PENDING) {
        this.uploadFile(file.file)
        return true
      }
    }
    // The are no more outstanding chunks to upload, check is everything is done
    // 检查所有的是否完成
    const outstanding = this.files.some((file) => !file.isComplete())
    if (!outstanding && !preventEvents && this.files.length) {
      // All chunks have been uploaded, complete
      // this._triggerAsync('complete')
    }
    return outstanding
  }
  protected _shouldUploadNext(): boolean | number {
    let num = 0
    const simultaneousUploads = this.opts.simultaneousUploads
    for (const file of this.files) {
      if (file.isUploading()) {
        num++
        if (num >= simultaneousUploads) {
          return false
        }
      }
    }
    return num
  }
  protected _removeFile(file: UFile) {
    if (!file.isFolder) {
      utils.each(this.files, (f: UFile, i: number) => {
        if (f === file) {
          this.files.splice(i, 1)
          return false
        }
      })
      file.abort()
      let parent = file.parent
      let newParent
      while (parent && parent !== this) {
        newParent = parent.parent
        parent._removeFile(file)
        parent = newParent
      }
    }
    file.parent === this &&
      utils.each(this.fileList, (f: any, i: any) => {
        if (f === file) {
          this.fileList.splice(i, 1)
          return false
        }
      })
    if (!this.isRoot && this.isFolder && !this.files.length) {
      this.parent._removeFile(this)
      // this._delFilePath(this)
    }
    file.parent = null
  }
}
</script>
