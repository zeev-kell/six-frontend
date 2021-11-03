const oproto = Object.prototype
const aproto = Array.prototype
const serialize = oproto.toString

const isFunction = function (fn: any) {
  return serialize.call(fn) === '[object Function]'
}

const isArray =
  Array.isArray ||
  /* istanbul ignore next */ function (ary) {
    return serialize.call(ary) === '[object Array]'
  }

const isPlainObject = function (obj: any) {
  return serialize.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) === oproto
}

const utils = {
  noop() {},
  bind(fn: any, context: any) {
    return function () {
      return fn.apply(context, arguments)
    }
  },
  preventEvent(evt: Event) {
    evt.preventDefault()
  },
  stop(evt: Event) {
    evt.preventDefault()
    evt.stopPropagation()
  },
  nextTick(fn: any, context: any) {
    setTimeout(utils.bind(fn, context), 0)
  },
  toArray(ary: any, start?: any, end?: any) {
    if (start === undefined) start = 0
    if (end === undefined) end = ary.length
    return aproto.slice.call(ary, start, end)
  },
  isPlainObject,
  isFunction,
  isArray,
  isObject(obj: any) {
    return Object(obj) === obj
  },
  isString(s: any) {
    return typeof s === 'string'
  },
  isUndefined(a: any) {
    return typeof a === 'undefined'
  },
  isDefined(a: any) {
    return typeof a !== 'undefined'
  },

  each(ary: any, func?: any, context?: any) {
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
  evalOpts(data: any, args: any) {
    if (utils.isFunction(data)) {
      // `arguments` is an object, not array, in FF, so:
      args = utils.toArray(arguments as any)
      data = data.apply(null, args.slice(1))
    }
    return data
  },

  extend(...arg: any) {
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

    // 如果第一个参数为布尔,判定是否深拷贝
    if (typeof target === 'boolean') {
      force = target
      target = arguments[1] || {}
      i++
    }

    // 确保接受方为一个复杂的数据类型
    if (typeof target !== 'object' && !isFunction(target)) {
      target = {}
    }

    // 如果只有一个参数，那么新成员添加于 extend 所在的对象上
    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      // 只处理非空参数
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name]
          copy = options[name]

          // 防止环引用
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

  formatSize(size: number) {
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

  defineNonEnumerable(target: any, key: any, value: any) {
    Object.defineProperty(target, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value,
    })
  },
}
export default utils
