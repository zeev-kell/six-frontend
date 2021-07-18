// 增加处理异常的 message 提示
import Element from 'element-ui'
export default ({ $axios }, inject) => {
  const $$axios = new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
