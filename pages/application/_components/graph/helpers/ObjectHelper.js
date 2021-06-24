export class ObjectHelper {
  static pathDelimiter = '.'

  /**
   * Adds a value to a nested path in an object
   *
   * @param target Target object to add properties to
   * @param path dot-delimited path, ex. "foo.bar.baz"
   * @param value value to add to the "baz" key
   */
  static addProperty(target, path, value) {
    // Ensure that path is an array of path elements
    const resolvedPath = typeof path === 'string' ? path.split(ObjectHelper.pathDelimiter).filter((v) => v.length) : path
    if (!resolvedPath) {
      return
    }
    resolvedPath.reduce((acc, curr, index, arr) => {
      const arrayMatch = curr.match(/^\[([0-9]*?)\]$/)
      if (arrayMatch && arrayMatch.length === 2 && Array.isArray(acc)) {
        if (index !== arr.length - 1) {
          return acc[arrayMatch[1]]
        }
        return (acc[arrayMatch[1]] = value)
      }

      if (index === arr.length - 1) {
        return (acc[curr] = value)
      }

      // eslint-disable-next-line no-prototype-builtins
      if (!acc.hasOwnProperty(curr)) {
        acc[curr] = {}
        return acc[curr]
      } else if (typeof acc[curr] === 'object' && acc[curr] !== null) {
        if (Array.isArray(acc[curr])) {
          return acc[curr]
        }

        return acc[curr]
      } else {
        throw new Error("Couldn't add a nested property to type " + typeof acc)
      }
    }, target)
  }

  static getProperty(target, path, defaultReturn) {
    const parts = path.split(this.pathDelimiter).filter((v) => v.length)
    if (!target) {
      return defaultReturn
    }

    for (const key of parts) {
      if (Array.isArray(target) && key) {
        const arrayMatch = key.match(/^\[([0-9]*?)\]$/)
        if (Array.isArray(arrayMatch) && arrayMatch.length === 2) {
          target = target[arrayMatch[1]]
          continue
        }
      }

      if (!target[key] && target[key] !== 0 && target[key] !== false) {
        return defaultReturn
      }

      target = target[key]
    }

    return target
  }

  /**
   * Overwrite enumerable properties of the target with the ones from the source object
   * @param target
   * @param source
   * @returns {Object}
   */
  static addEnumerables(target, source) {
    for (const key of Object.keys(source)) {
      // eslint-disable-next-line no-prototype-builtins
      if (target.propertyIsEnumerable(key)) {
        target[key] = source[key]
      }
    }
  }

  /**
   * Returns true if arg is one of: [undefined, null, number, boolean, string]
   * @param arg
   * @returns boolean
   */
  static isPrimitiveValue(arg) {
    const type = typeof arg
    return arg == null || (type !== 'object' && type !== 'function')
  }
}
