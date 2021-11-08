import { uuid4 } from '@/utils/uuid'
import { getMimeType } from '@/pages/application/datum/_components/mime'
import { getFileMd5 } from '@/utils/file-md5'
const STATUS = {
  READING: 'reading',
  PENDING: 'pending',
  UPLOADING: 'uploading',
  PROGRESS: 'progress',
  SUCCESS: 'success',
  ERROR: 'error',
  RETRY: 'retry',
}
export default class UFile {
  uniqueIdentifier: string = ''
  id: string = ''
  resourceId: string = ''
  file: File | null = null
  path: string = ''
  name: string = ''
  fileType: string = ''
  bytes: number = 0
  status: string = ''
  hash: string = ''
  mediaType: string = ''
  label: string = ''
  encoding: string = ''
  description: string = ''
  constructor(file: File | string) {
    if (typeof file === 'string') {
      this.file = null
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
  }
  initHash(): void {
    this.status = STATUS.READING
    getFileMd5(this.file as File).then((hash: string) => {
      this.hash = hash
      this.status = STATUS.PENDING
    })
  }
  isOssFile(): boolean {
    return this.file !== null
  }
  isPending(): boolean {
    return this.status === STATUS.PENDING
  }
  isUploading(): boolean {
    return this.status === STATUS.UPLOADING
  }
  isSuccess(): boolean {
    return this.status === STATUS.SUCCESS
  }
  isDone(): boolean {
    return this.status === STATUS.SUCCESS || this.status === STATUS.ERROR
  }
  uploadStart(): void {
    this.status = STATUS.UPLOADING
  }
  uploaded(): void {
    this.status = STATUS.SUCCESS
  }
  uploadError(e: any): void {
    console.log(e)
    this.status = STATUS.ERROR
  }
  get loading(): boolean {
    return true || this.status === STATUS.READING
  }
}
