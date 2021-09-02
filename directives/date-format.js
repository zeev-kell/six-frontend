import { format } from 'element-ui/src/utils/date'

const DEFAULT_FORMAT = 'yyyy/MM/DD HH:mm'

export const dateFormat = function (date, _format = DEFAULT_FORMAT) {
  date = typeof date !== 'number' ? Number(date) : date
  if (isNaN(date)) {
    return '-'
  }
  return format(date, _format)
}

export default function (el, binding) {
  if (!binding.value) {
    el.innerHTML = '-'
    return ''
  }
  el.innerHTML = dateFormat(binding.value)
}
