import UFile from '@/pages/_components/FileUploader/UFile'

export default class FileUploaderImplement {
  // 文件
  files: UFile[] = []
  options!: any[]
  addFiles!: (files: FileList, e?: Event) => void
  removeFile!: (files: UFile) => void
}
