import { S4, uuid4 } from '@/utils/uuid'
import { getMimeType } from '@/pages/application/datum/_components/mime'
import { getFileMd5 } from '@/utils/file-md5'
import FileUploaderImplement from '@/pages/_components/FileUploader/FileUploaderImplement'
const STATUS = {
  READING: 'reading',
  PENDING: 'pending',
  UPLOADING: 'uploading',
  PROGRESS: 'progress',
  SUCCESS: 'success',
  ERROR: 'error',
  RETRY: 'retry',
  REFUSE: 'refuse',
}
const getFileNameByUrl = function (url: string) {
  if (!url) {
    return ''
  }
  const name = url.split('?')[0].split('/').pop()
  if (name && name.includes('.')) {
    return name
  }
  return 'file_' + S4()
}
export default class UFile {
  uniqueIdentifier: string = ''
  id: string = ''
  // 数据校验
  valid: boolean = false
  resourceId: string = ''
  file: File | null = null
  path: string = ''
  name: string = ''
  fileType: string = ''
  bytes: number = 0
  status: string = ''
  errorMsg: string | undefined
  hash: string = ''
  mediaType: string = ''
  label: string = ''
  encoding: string = ''
  schema: string = ''
  description: string = ''
  progress: number = 0
  FileUploader: FileUploaderImplement
  constructor(file: File | string, FileUploader: FileUploaderImplement) {
    if (typeof file === 'string') {
      this.file = null
      this.name = getFileNameByUrl(file)
      this.path = file
      this.status = STATUS.PENDING
    } else {
      this.file = file
      this.fileType = this.file.type
      this.name = (file as any).fileName || file.name
      this.bytes = file.size
      this.mediaType = getMimeType(this.name)
      this.initHash()
    }
    this.id = uuid4()
    this.FileUploader = FileUploader
  }
  get loading(): boolean {
    return this.status === STATUS.READING
  }
  get canEdit(): boolean {
    return [STATUS.READING, STATUS.PENDING, STATUS.ERROR].includes(this.status)
  }
  initHash(): void {
    this.status = STATUS.READING
    getFileMd5(this.file as File).then((hash: string) => {
      this.hash = hash
      this.FileUploader.$emit('upload.file.initHash', this)
    })
  }
  isOssFile(): boolean {
    return this.file !== null
  }
  isPending(): boolean {
    return this.valid && this.status === STATUS.PENDING
  }
  isUploading(): boolean {
    return this.status === STATUS.UPLOADING
  }
  isSuccess(): boolean {
    return this.status === STATUS.SUCCESS
  }
  isDone(): boolean {
    return [STATUS.SUCCESS, STATUS.ERROR].includes(this.status)
  }
  isValid(): boolean {
    return this.valid
  }
  uploadStart(): void {
    this.valid && (this.status = STATUS.UPLOADING)
  }
  uploaded(): void {
    this.status = STATUS.SUCCESS
  }
  uploadError(e: any): void {
    console.log(e)
    this.status = STATUS.ERROR
    this.errorMsg = e?.msg || e
  }
  uploadRefuse(e: any): void {
    this.valid = false
    this.status = STATUS.REFUSE
    this.errorMsg = e?.msg || e
  }
  // resetError(): void {}
}
