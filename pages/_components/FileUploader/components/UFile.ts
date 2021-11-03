import { uuid4 } from '@/utils/uuid'
import Base from '@/pages/_components/FileUploader/components/Base'
import Chunk from './Chunk'
import utils from './utils'

function parsePaths(path: string) {
  const ret = []
  const paths = path.split('/')
  let len = paths.length
  let i = 1
  paths.splice(len - 1, 1)
  len--
  if (paths.length) {
    while (i <= len) {
      ret.push(paths.slice(0, i++).join('/') + '/')
    }
  }
  return ret
}

export default class UFile extends Base {
  private id: string
  private path: any
  protected _errorFiles: any[] = []
  file: any = []
  name: any
  fileType: any
  size: any
  status: string = ''
  paused: boolean = false
  aborted: boolean
  completed: boolean
  private readonly relativePath: any
  private error: boolean
  private allError: boolean
  averageSpeed: number
  currentSpeed: number
  private readonly _lastProgressCallback: number
  private _prevUploadedSize: number
  private _prevProgress: number
  private chunks: any[] = []
  uniqueIdentifier: string = ''
  private filePaths: any[] = []
  static STATUS = {
    PENDING: 'pending',
    UPLOADING: 'uploading',
    READING: 'reading',
    SUCCESS: 'success',
    ERROR: 'error',
    COMPLETE: 'complete',
    PROGRESS: 'progress',
    RETRY: 'retry',
  }
  constructor(uploader: any, file: File | string, parent: any) {
    super()
    this.isRoot = this.isFolder = uploader === this
    this.uploader = uploader
    this.parent = parent || null
    this.file = file
    this.id = uuid4()
    if (this.isRoot || !file) {
      this.file = null
    } else if (typeof file === 'string') {
      // folder
      this.isFolder = true
      this.file = null
      this.path = file
      if (this.parent.path) {
        file = file.substr(this.parent.path.length)
      }
      this.name = file.charAt(file.length - 1) === '/' ? file.substr(0, file.length - 1) : file
    } else {
      this.file = file
      this.fileType = this.file.type
      this.name = (file as any).fileName || file.name
      this.size = file.size
      this.relativePath = (file as any).relativePath || (file as any).webkitRelativePath || this.name
      this._parseFile()
    }
    this.paused = uploader.opts.initialPaused
    this.error = false
    this.allError = false
    this.aborted = false
    this.completed = false
    this.status = UFile.STATUS.PENDING
    this.averageSpeed = 0
    this.currentSpeed = 0
    this._lastProgressCallback = Date.now()
    this._prevUploadedSize = 0
    this._prevProgress = 0

    this.bootstrap()
  }

  _parseFile() {
    const ppaths = parsePaths(this.relativePath)
    if (ppaths.length) {
      const filePaths = this.uploader.filePaths
      utils.each(
        ppaths,
        (path: string, i: number) => {
          let folderFile = filePaths[path]
          if (!folderFile) {
            folderFile = new UFile(this.uploader, path, this.parent)
            filePaths[path] = folderFile
            this._updateParentFileList(folderFile)
          }
          this.parent = folderFile
          folderFile.files.push(this)
          if (!ppaths[i + 1]) {
            folderFile.fileList.push(this)
          }
        },
        this
      )
    } else {
      this._updateParentFileList()
    }
  }

  _updateParentFileList(file?: this) {
    if (!file) {
      file = this
    }
    const p = this.parent
    if (p) {
      p.fileList.push(file)
    }
  }

  _eachAccess(eachFn: any, fileFn: any) {
    if (this.isFolder) {
      utils.each(
        this.files,
        (f: any, i: any) => {
          return eachFn.call(this, f, i)
        },
        this
      )
      return
    }
    fileFn.call(this, this)
  }

  bootstrap() {
    if (this.isFolder) return
    const opts = this.uploader.opts
    if (utils.isFunction(opts.initFileFn)) {
      opts.initFileFn.call(this, this)
    }

    this.abort(true)
    this._resetError()
    // Rebuild stack of chunks from file
    this._prevProgress = 0
    const round = opts.forceChunkSize ? Math.ceil : Math.floor
    const chunks = Math.max(round(this.size / opts.chunkSize), 1)
    for (let offset = 0; offset < chunks; offset++) {
      // this.chunks.push(new Chunk(this.uploader, this, offset))
    }
  }

  _measureSpeed() {
    const smoothingFactor = this.uploader.opts.speedSmoothingFactor
    const timeSpan = Date.now() - this._lastProgressCallback
    if (!timeSpan) {
      return
    }
    const uploaded = this.sizeUploaded()
    // Prevent negative upload speed after file upload resume
    this.currentSpeed = Math.max(((uploaded - this._prevUploadedSize) / timeSpan) * 1000, 0)
    this.averageSpeed = smoothingFactor * this.currentSpeed + (1 - smoothingFactor) * this.averageSpeed
    this._prevUploadedSize = uploaded
    if (this.parent && this.parent._checkProgress()) {
      this.parent._measureSpeed()
    }
  }

  _checkProgress(file?: any) {
    return Date.now() - this._lastProgressCallback >= this.uploader.opts.progressCallbacksInterval
  }

  _error() {
    this.error = this.allError = true
    let parent = this.parent
    while (parent && parent !== this.uploader) {
      parent._errorFiles.push(this)
      parent.error = true
      if (parent._errorFiles.length === parent.files.length) {
        parent.allError = true
      }
      parent = parent.parent
    }
  }

  _resetError() {
    this.error = this.allError = false
    let parent = this.parent
    let index = -1
    while (parent && parent !== this.uploader) {
      index = parent._errorFiles.indexOf(this)
      parent._errorFiles.splice(index, 1)
      parent.allError = false
      if (!parent._errorFiles.length) {
        parent.error = false
      }
      parent = parent.parent
    }
  }

  isComplete() {
    if (!this.completed) {
      let outstanding = false
      this._eachAccess(
        function (file: any) {
          if (!file.isComplete()) {
            outstanding = true
            return false
          }
        },
        () => {
          if (this.error) {
            outstanding = true
          } else {
            // const STATUS = Chunk.STATUS
            // utils.each(this.chunks, function (chunk) {
            //   const status = chunk.status()
            //   if (
            //     status === STATUS.ERROR ||
            //     status === STATUS.PENDING ||
            //     status === STATUS.UPLOADING ||
            //     status === STATUS.READING ||
            //     chunk.preprocessState === 1 ||
            //     chunk.readState === 1
            //   ) {
            //     outstanding = true
            //     return false
            //   }
            // })
          }
        }
      )
      this.completed = !outstanding
    }
    return this.completed
  }

  isUploading() {
    let uploading = false
    this._eachAccess(
      function (file: any) {
        if (file.isUploading()) {
          uploading = true
          return false
        }
      },
      () => {
        const uploadingStatus = Chunk.STATUS.UPLOADING
        utils.each(this.chunks, function (chunk: any) {
          if (chunk.status() === uploadingStatus) {
            uploading = true
            return false
          }
        })
      }
    )
    return uploading
  }

  resume() {
    this._eachAccess(
      function (f: any) {
        f.resume()
      },
      () => {
        this.paused = false
        this.aborted = false
        this.uploader.upload()
      }
    )
    this.paused = false
    this.aborted = false
  }

  pause() {
    this._eachAccess(
      function (f: any) {
        f.pause()
      },
      () => {
        this.paused = true
        this.abort()
      }
    )
    this.paused = true
  }

  cancel() {
    this.uploader.removeFile(this)
  }

  retry(file: any) {
    const fileRetry = function (file: any) {
      if (file.error) {
        file.bootstrap()
      }
    }
    if (file) {
      file.bootstrap()
    } else {
      this._eachAccess(fileRetry, () => {
        this.bootstrap()
      })
    }
    this.uploader.upload()
  }

  abort(reset?: boolean) {
    if (this.aborted) {
      return
    }
    this.currentSpeed = 0
    this.averageSpeed = 0
    this.aborted = !reset
    const chunks = this.chunks
    if (reset) {
      this.chunks = []
    }
    const uploadingStatus = Chunk.STATUS.UPLOADING
    utils.each(
      chunks,
      (c: any) => {
        if (c.status() === uploadingStatus) {
          c.abort()
          this.uploader.uploadNextChunk()
        }
      },
      this
    )
  }

  progress() {
    let totalDone = 0
    let totalSize = 0
    let ret = 0
    this._eachAccess(
      (file: any, index: any) => {
        totalDone += file.progress() * file.size
        totalSize += file.size
        if (index === this.files.length - 1) {
          ret = totalSize > 0 ? totalDone / totalSize : this.isComplete() ? 1 : 0
        }
      },
      () => {
        if (this.error) {
          ret = 1
          return
        }
        if (this.chunks.length === 1) {
          this._prevProgress = Math.max(this._prevProgress, this.chunks[0].progress())
          ret = this._prevProgress
          return
        }
        // Sum up progress across everything
        let bytesLoaded = 0
        utils.each(this.chunks, function (c: any) {
          // get chunk progress relative to entire file
          bytesLoaded += c.progress() * (c.endByte - c.startByte)
        })
        const percent = bytesLoaded / this.size
        // We don't want to lose percentages when an upload is paused
        this._prevProgress = Math.max(this._prevProgress, percent > 0.9999 ? 1 : percent)
        ret = this._prevProgress
      }
    )
    return ret
  }

  getSize() {
    let size = 0
    this._eachAccess(
      function (file: any) {
        size += file.size
      },
      () => {
        size += this.size
      }
    )
    return size
  }

  getFormatSize() {
    const size = this.getSize()
    return utils.formatSize(size)
  }

  getRoot() {
    if (this.isRoot) {
      return this
    }
    let parent = this.parent
    while (parent) {
      if (parent.parent === this.uploader) {
        // find it
        return parent
      }
      parent = parent.parent
    }
    return this
  }

  sizeUploaded() {
    let size = 0
    this._eachAccess(
      function (file: any) {
        size += file.sizeUploaded()
      },
      () => {
        utils.each(this.chunks, function (chunk: any) {
          size += chunk.sizeUploaded()
        })
      }
    )
    return size
  }

  timeRemaining() {
    let ret = 0
    let sizeDelta = 0
    let averageSpeed = 0
    this._eachAccess(
      (file: any, i: any) => {
        if (!file.paused && !file.error) {
          sizeDelta += file.size - file.sizeUploaded()
          averageSpeed += file.averageSpeed
        }
        if (i === this.files.length - 1) {
          ret = calRet(sizeDelta, averageSpeed)
        }
      },
      () => {
        if (this.paused || this.error) {
          ret = 0
          return
        }
        const delta = this.size - this.sizeUploaded()
        ret = calRet(delta, this.averageSpeed)
      }
    )
    return ret
    function calRet(delta: any, averageSpeed: any) {
      if (delta && !averageSpeed) {
        return Number.POSITIVE_INFINITY
      }
      if (!delta && !averageSpeed) {
        return 0
      }
      return Math.floor(delta / averageSpeed)
    }
  }
  removeFile(file: any) {
    if (file.isFolder) {
      while (file.files.length) {
        const f = file.files[file.files.length - 1]
        this._removeFile(f)
      }
    }
    this._removeFile(file)
  }

  _delFilePath(file: any) {
    if (file.path && this.filePaths) {
      delete this.filePaths[file.path]
    }
    utils.each(
      file.fileList,
      (file: any) => {
        this._delFilePath(file)
      },
      this
    )
  }

  getType() {
    if (this.isFolder) {
      return 'folder'
    }
    return this.file.type && this.file.type.split('/')[1]
  }

  getExtension() {
    if (this.isFolder) {
      return ''
    }
    return this.name.substr((~-this.name.lastIndexOf('.') >>> 0) + 2).toLowerCase()
  }

  async send() {
    await this.uploader
    const preprocess = this.uploader.opts.preprocess
    if (utils.isFunction(preprocess)) {
      preprocess(this)
    }
  }
}
