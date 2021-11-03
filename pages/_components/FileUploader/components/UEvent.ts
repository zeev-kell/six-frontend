import Base from '@/pages/_components/FileUploader/components/Base'
import utils from './utils'
const each = utils.each

export default class UEvent extends Base {
  _eventData: any = {}
  on(name: string, func: any) {
    if (!this._eventData[name]) this._eventData[name] = []
    let listened = false
    each(this._eventData[name], function (fuc: any) {
      if (fuc === func) {
        listened = true
        return false
      }
    })
    if (!listened) {
      this._eventData[name].push(func)
    }
  }
  off(name: string, func: any) {
    if (!this._eventData[name] || !this._eventData[name].length) return
    if (func) {
      each(
        this._eventData[name],
        (fuc: any, i: any) => {
          if (fuc === func) {
            this._eventData[name].splice(i, 1)
            return false
          }
        },
        this
      )
    } else {
      this._eventData[name] = []
    }
  }
  trigger(name: any, ...arg: any[]) {
    if (!this._eventData[name]) return true
    const args = this._eventData[name].slice.call(arguments, 1)
    let preventDefault = false
    each(
      this._eventData[name],
      (fuc: any) => {
        preventDefault = fuc.apply(this, args) === false || preventDefault
      },
      this
    )
    return !preventDefault
  }
}
