// 增加处理异常的 message 提示
import Element from 'element-ui'

export function MESSAGE_SUCCESS(response: any) {
  Element.Message.success('操作成功')
  return response
}

export function MESSAGE_ERROR(error: any) {
  const msg = typeof error?.msg === 'string' ? error?.msg : '操作失败'
  Element.Message.error(msg)
  return Promise.reject(error)
}
