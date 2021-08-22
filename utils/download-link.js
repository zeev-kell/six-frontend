export function downloadStrLink(data, filename) {
  if (!data) {
    return
  }
  if (!filename) filename = 'json.json'
  if (typeof data === 'object') {
    data = JSON.stringify(
      data,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (key, value) => {
        if (typeof value === 'string') {
          return value.replace(/\u2002/g, ' ')
        }
        return value
      },
      4
    )
  }
  const blob = new Blob([data], { type: 'text/json' })
  downloadBlobLink(blob, filename)
}
export function downloadBlobLink(blob, filename) {
  const e = document.createEvent('MouseEvents')
  const a = document.createElement('a')
  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
  window.URL.revokeObjectURL(a.href)
}
