export class AppHelper {
  static DS = process.client && navigator.platform.startsWith('Win') ? '\\' : '/'

  static isLocal(appID: string): boolean {
    return AppHelper.isUnixPath(appID) || AppHelper.isWindowsPath(appID)
  }

  static isWindowsPath(appID: string): boolean {
    return /^[a-z]:\\.+$/i.test(appID)
  }

  static isUnixPath(appID: string): boolean {
    return appID.startsWith('/')
  }

  static getRevisionlessID(appID: string): string {
    return appID.split('/').slice(0, 3).join('/')
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static getAppIDWithRevision(id: string, revision: any): string {
    const revisionless = id.split('/').slice(0, 3).join('/')
    if (revision === null) {
      return revisionless
    }

    return revisionless + '/' + revision.toString()
  }

  static getBasename(path: string, stripExtension = false): string {
    let lastPathPart: string = <string>path.split('/').pop()

    if (AppHelper.isLocal(path)) {
      lastPathPart = <string>path.split(AppHelper.DS).pop()
    }

    if (stripExtension) {
      const split = lastPathPart.split('.')
      if (split.length > 1) {
        return split.slice(0, -1).join('.')
      }

      return split.join('.')
    }

    return lastPathPart
  }

  static endsWithAppExtension(path: string): string | false {
    const appExtensions = ['.cwl', '.json', '.yml', '.yaml']

    for (let i = 0; i < appExtensions.length; i++) {
      if (path.endsWith(appExtensions[i])) {
        return appExtensions[i]
      }
    }

    return false
  }

  static getDirname(filepath: string): string {
    if (AppHelper.isLocal(filepath)) {
      return filepath.split(AppHelper.DS).slice(0, -1).join(AppHelper.DS)
    }

    return filepath.split('/').slice(0, -1).join('/')
  }

  static getRevision(appID: string): number | null {
    const parts: string[] = appID.split('/')
    if (parts.length !== 4) {
      return null
    }

    const numeric = parseInt(<string>parts.pop())
    if (isNaN(numeric)) {
      return null
    }

    return numeric
  }
}
