import utils from '@/pages/_components/FileUploader/components/utils'

export default class Base {
  // 所有的 UFile 实例
  files: any[] = []
  // 所有的 UFile 实例（文件夹）
  fileList: any[] = []
  isFolder: boolean = false
  isRoot: boolean = false
  parent: any
  uploader: any
  protected _removeFile(file: any) {
    if (!file.isFolder) {
      utils.each(
        this.files,
        (f: any, i: any) => {
          if (f === file) {
            this.files.splice(i, 1)
            return false
          }
        },
        this
      )
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
      utils.each(
        this.fileList,
        (f: any, i: any) => {
          if (f === file) {
            this.fileList.splice(i, 1)
            return false
          }
        },
        this
      )
    if (!this.isRoot && this.isFolder && !this.files.length) {
      this.parent._removeFile(this)
      this.uploader._delFilePath(this)
    }
    file.parent = null
  }
}
