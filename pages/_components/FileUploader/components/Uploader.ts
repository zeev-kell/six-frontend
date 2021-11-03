import OSS from 'ali-oss'
import UFile from './UFile'
import UEvent from './UEvent'
import utils from './utils'

const isServer = typeof window === 'undefined'

class Uploader extends UEvent {
  static sliceName: string = 'slice'
  static defaults = {
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
  private supportDirectory: boolean | undefined
  private opts: any | {}
  private readonly preventEvent: (() => any) | undefined
  private readonly support: boolean
  protected filePaths: any
  client: OSS | undefined

  constructor(opts: any) {
    super()
    this.support = support
    /* istanbul ignore if */
    if (!this.support) {
      return
    }
    this.supportDirectory = supportDirectory
    this.filePaths = {}
    this.opts = utils.extend({}, Uploader.defaults, opts || {})
    this.preventEvent = utils.bind(this._preventEvent, this)
  }

  _trigger(name: string, ...arg: any) {
    const args = utils.toArray(arguments)
    let preventDefault = !this.trigger.apply(this, arguments as any)
    if (name !== 'catchAll') {
      args.unshift('catchAll')
      preventDefault = !this.trigger.apply(this, args as any) || preventDefault
    }
    return !preventDefault
  }
  _triggerAsync(...args: any) {
    utils.nextTick(() => {
      this._trigger.apply(this, args)
    }, this)
  }
  _preventEvent(e: Event) {
    utils.preventEvent(e)
    this._trigger(e.type, e)
  }
  addFiles(files: any, evt: Event) {
    const _files: any[] = []
    const oldFileListLen = this.fileList.length
    utils.each(
      files,
      (file: any) => {
        // Uploading empty file IE10/IE11 hangs indefinitely
        // Directories have size `0` and name `.`
        // Ignore already added files if opts.allowDuplicateUploads is set to false
        if ((!ie10plus || (ie10plus && file.size > 0)) && !(file.size % 4096 === 0 && (file.name === '.' || file.fileName === '.'))) {
          const uniqueIdentifier = this.generateUniqueIdentifier(file)
          if (this.opts.allowDuplicateUploads || !this.getFromUniqueIdentifier(uniqueIdentifier)) {
            const _file = new UFile(this, file, this)
            _file.uniqueIdentifier = uniqueIdentifier
            if (this._trigger('fileAdded', _file, evt)) {
              _files.push(_file)
            } else {
              UFile.prototype.removeFile.call(this, _file)
            }
          }
        }
      },
      this
    )
    // get new fileList
    const newFileList = this.fileList.slice(oldFileListLen)
    if (this._trigger('filesAdded', _files, newFileList, evt)) {
      utils.each(
        _files,
        (file: any) => {
          if (this.opts.singleFile && this.files.length > 0) {
            this.removeFile(this.files[0])
          }
          this.files.push(file)
        },
        this
      )
      this._trigger('filesSubmitted', _files, newFileList, evt)
    } else {
      utils.each(
        newFileList,
        (file: any) => {
          UFile.prototype.removeFile.call(this, file)
        },
        this
      )
    }
  }
  generateUniqueIdentifier(file: any) {
    const relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name
    return file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/gim, '')
  }
  getFromUniqueIdentifier(uniqueIdentifier: string) {
    let ret = false
    utils.each(this.files, function (file: any) {
      if (file.uniqueIdentifier === uniqueIdentifier) {
        ret = file
        return false
      }
    })
    return ret
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
  uploadNextChunk(preventEvents: boolean) {
    let found = false
    utils.each(this.files, (file: UFile) => {
      if (!file.paused) {
        if (file.status === UFile.STATUS.PENDING) {
          // this.uploadFile()
          found = true
          return false
        }
      }
      if (found) {
        return false
      }
    })
    if (found) {
      return true
    }
    // The are no more outstanding chunks to upload, check is everything is done
    let outstanding = false
    utils.each(this.files, function (file: UFile) {
      if (!file.isComplete()) {
        outstanding = true
        return false
      }
    })
    // should check files now
    // if now files in list
    // should not trigger complete event
    if (!outstanding && !preventEvents && this.files.length) {
      // All chunks have been uploaded, complete
      this._triggerAsync('complete')
    }
    return outstanding
  }
  protected _shouldUploadNext(): boolean | number {
    let num = 0
    let should = true
    const simultaneousUploads = this.opts.simultaneousUploads
    utils.each(this.files, function (file: UFile) {
      if (file.isUploading()) {
        num++
        if (num >= simultaneousUploads) {
          should = false
          return false
        }
      }
      return should
    })
    return should && num
  }
  upload(preventEvents?: boolean) {
    // Make sure we don't start too many uploads at once
    const ret = this._shouldUploadNext()
    if (ret === false) {
      return
    }
    !preventEvents && this._trigger('uploadStart')
    let started = false
    for (let num = 1; num <= this.opts.simultaneousUploads - (ret as number); num++) {
      started = this.uploadNextChunk(!preventEvents) || started
      if (!started && preventEvents) {
        break
      }
    }
    if (!started && !preventEvents) {
      this._triggerAsync('complete')
    }
  }
}

// ie10+
const ie10plus = isServer ? false : window.navigator.msPointerEnabled
const support = (function () {
  if (isServer) {
    return false
  }
  let sliceName = 'slice'
  let _support = utils.isDefined(window.File) && utils.isDefined(window.Blob) && utils.isDefined(window.FileList)
  let bproto: any = null
  if (_support) {
    bproto = window.Blob.prototype
    utils.each(['slice', 'webkitSlice', 'mozSlice'], function (n: any) {
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

export { Uploader }
