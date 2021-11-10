/**
 * 字节转换为kb、Gb
 * Created by keziyuan on 2021/2/13 20:20.
 */

export function formatBytes(bytes: number | string, decimals = 2) {
  if (typeof bytes === 'string') {
    bytes = Number(bytes)
  }
  if (!bytes || bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export default {
  formatbytes: formatBytes,
}
