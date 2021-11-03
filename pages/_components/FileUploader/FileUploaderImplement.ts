import { Uploader } from '@/pages/_components/FileUploader/components/Uploader'

export default class FileUploaderImplement {
  uploader!: Uploader
  // 文件
  files: any[] = []
  // 可能有文件夹
  fileList: any[] = []

  addFiles: any
  uploadFile: any
}
