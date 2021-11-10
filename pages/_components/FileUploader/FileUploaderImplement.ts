import UFile from '@/pages/_components/FileUploader/UFile'

export default class FileUploaderImplement {
  // 文件
  files: UFile[] = []
  options!: any[]
  hasFile!: boolean
  addFiles!: (files: FileList | string, e?: Event) => void
  removeFile!: (files: UFile) => void
}
