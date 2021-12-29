// 增加处理异常的 message 提示
import Element from 'element-ui'

export function MESSAGE_SUCCESS(response: any) {
  Element.Message.success('操作成功')
  return response
}

export function MESSAGE_ERROR(error: any) {
  Element.Message.error(error?.msg || '操作失败')
  return Promise.reject(error)
}
