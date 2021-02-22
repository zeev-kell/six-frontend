// 增加处理异常的 message 提示
import Element from 'element-ui'
export default ({ app, $axios, $message }, inject) => {
  const $$axios = new Proxy(
    {},
    {
      get(target, key) {
        return function (...args) {
          return $axios[key](...args).catch((e) => {
            Element.Message.error(e.msg || e)
            return Promise.reject(e)
          })
        }
      },
    }
  )
  inject('$axios', $$axios)
}