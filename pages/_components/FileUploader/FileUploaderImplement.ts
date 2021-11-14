import UFile from '@/pages/_components/FileUploader/components/UFile'
import { Vue } from 'nuxt-property-decorator'

export default class FileUploaderImplement extends Vue {
  // 文件
  files: UFile[] = []
  options!: any[]
  hasFile!: boolean
  addFiles!: (files: FileList | string, e?: Event) => void
  removeFile!: (files: UFile) => void
}
