<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import OSS from 'ali-oss'
import FileUploaderBtn from '@/pages/_components/FileUploader/components/FileBtn.vue'
import FileUploaderLink from '@/pages/_components/FileUploader/components/FileLink.vue'
import FileUploaderDrop from '@/pages/_components/FileUploader/components/FileDrop.vue'
import FileUploaderList from '@/pages/_components/FileUploader/components/FileList.vue'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import FileUploaderImplement from '@/pages/_components/FileUploader/FileUploaderImplement'
import OssUploadMixin from '@/pages/application/datum/_components/OssUploadMixin.vue'

const isServer = typeof window === 'undefined'
const ie10plus = isServer ? false : window.navigator.msPointerEnabled
const MAX_SIZE = 2 * 1024 * 1024

function generateUniqueIdentifier(file: any): string {
  const relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name
  return file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/gim, '')
}

@Component({
  components: { FileUploaderList, FileUploaderDrop, FileUploaderBtn, FileUploaderLink },
  provide() {
    return {
      FileUploader: this,
    }
  },
})
export default class FileUploaderMixin extends OssUploadMixin implements FileUploaderImplement {
  error = false
  opts = {
    simultaneousUploads: 3,
    singleFile: false,
  }
  files: UFile[] = []
  errorFiles: UFile[] = []
  fields: any[] = []
  options: any[] = []
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
  public cleanFile(): void {
    this.files = []
  }
  getFromUniqueIdentifier(uniqueIdentifier: string): UFile | undefined {
    return this.files.find((file) => file.uniqueIdentifier === uniqueIdentifier)
  }

  protected async uploadFile(uFile: UFile): Promise<void> {
    uFile.resourceId = this.$route.params.id
    // 上传 link 文件
    if (!uFile.isOssFile()) {
      return await this.addFileToDatum(uFile)
    }
    await this.uploadOssFile(uFile)
    await this.addFileToDatum(uFile)
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
  beforeDestroy(): void {
    this.$off('upload.file.addField')
    this.$off('upload.file.removeField')
    this.$off('upload.file.initHash')
  }
}
</script>
