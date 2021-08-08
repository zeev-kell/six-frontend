export class ObjectHelper {
  private static pathDelimiter = '.'

  /**
   * Adds a value to a nested path in an object
   *
   * @param target Target object to add properties to
   * @param path dot-delimited path, ex. "foo.bar.baz"
   * @param value value to add to the "baz" key
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static addProperty(target: any, path: string[] | string, value: any): void {
    // Ensure that path is an array of path elements
    const resolvedPath = typeof path === 'string' ? path.split(ObjectHelper.pathDelimiter).filter((v) => v.length) : path

    if (!resolvedPath) {
      return
    }

    ;(<Array<string>>resolvedPath).reduce((acc: any, curr, index, arr) => {
      const arrayMatch = curr.match(/^\[([0-9]*?)]$/)
      if (arrayMatch && arrayMatch.length === 2 && Array.isArray(acc)) {
        if (index !== arr.length - 1) {
          return acc[arrayMatch[1] as unknown as number]
        }
        return (acc[arrayMatch[1] as unknown as number] = value)
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

  /**
   * Overwrite enumerable properties of the target with the ones from the source object
   * @param target
   * @param source
   * @returns {Object}
   */

  /**
   * Returns true if arg is one of: [undefined, null, number, boolean, string]
   * @param arg
   * @returns boolean
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static isPrimitiveValue(arg: any): boolean {
    const type = typeof arg
    return arg == null || (type !== 'object' && type !== 'function')
  }
}
