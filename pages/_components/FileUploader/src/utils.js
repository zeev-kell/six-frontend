const oproto = Object.prototype
const aproto = Array.prototype
const serialize = oproto.toString

const isFunction = function (fn) {
  return serialize.call(fn) === '[object Function]'
}

const isArray =
  Array.isArray ||
  /* istanbul ignore next */ function (ary) {
    return serialize.call(ary) === '[object Array]'
  }

const isPlainObject = function (obj) {
  return serialize.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) === oproto
}

let i = 0
const utils = {
  uid() {
    return ++i
  },
  noop() {},
  bind(fn, context) {
    return function () {
      return fn.apply(context, arguments)
    }
  },
  preventEvent(evt) {
    evt.preventDefault()
  },
  stop(evt) {
    evt.preventDefault()
    evt.stopPropagation()
  },
  nextTick(fn, context) {
    setTimeout(utils.bind(fn, context), 0)
  },
  toArray(ary, start, end) {
    if (start === undefined) start = 0
    if (end === undefined) end = ary.length
    return aproto.slice.call(ary, start, end)
  },

  isPlainObject,
  isFunction,
  isArray,
  isObject(obj) {
    return Object(obj) === obj
  },
  isString(s) {
    return typeof s === 'string'
  },
  isUndefined(a) {
    return typeof a === 'undefined'
  },
  isDefined(a) {
    return typeof a !== 'undefined'
  },

  each(ary, func, context) {
    if (utils.isDefined(ary.length)) {
      for (let i = 0, len = ary.length; i < len; i++) {
        if (func.call(context, ary[i], i, ary) === false) {
          break
        }
      }
    } else {
      for (const k in ary) {
        if (func.call(context, ary[k], k, ary) === false) {
          break
        }
      }
    }
  },

  /**
   * If option is a function, evaluate it with given params
   * @param {*} data
   * @param {...} args arguments of a callback
   * @returns {*}
   */
  evalOpts(data, args) {
    if (utils.isFunction(data)) {
      // `arguments` is an object, not array, in FF, so:
      args = utils.toArray(arguments)
      data = data.apply(null, args.slice(1))
    }
    return data
  },

  extend() {
    let options
    let name
    let src
    let copy
    let copyIsArray
    let clone
    let target = arguments[0] || {}
    let i = 1
    const length = arguments.length
    let force = false

    // ??????????????????????????????,?????????????????????
    if (typeof target === 'boolean') {
      force = target
      target = arguments[1] || {}
      i++
    }

    // ?????????????????????????????????????????????
    if (typeof target !== 'object' && !isFunction(target)) {
      target = {}
    }

    // ??????????????????????????????????????????????????? extend ??????????????????
    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      // ?????????????????????
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name]
          copy = options[name]

          // ???????????????
          if (target === copy) {
            continue
          }
          if (force && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && isArray(src) ? src : []
            } else {
              clone = src && isPlainObject(src) ? src : {}
            }
            target[name] = utils.extend(force, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  },

  formatSize(size) {
    if (size < 1024) {
      return size.toFixed(0) + ' bytes'
    } else if (size < 1024 * 1024) {
      return (size / 1024.0).toFixed(0) + ' KB'
    } else if (size < 1024 * 1024 * 1024) {
      return (size / 1024.0 / 1024.0).toFixed(1) + ' MB'
    } else {
      return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB'
    }
  },

  defineNonEnumerable(target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value,
    })
  },
}

module.exports = utils
