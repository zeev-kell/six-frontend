/**
 * Created by keziyuan on 2021/2/13 20:20.
 */
export default {
  intercept: function intercept(value, length = 50) {
    if (!value) return ''
    value = value.toString()
    if (value.length <= length) {
      return value
    }
    return value.substring(0, length) + '...'
  },
}
