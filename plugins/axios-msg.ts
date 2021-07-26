// 增加处理异常的 message 提示
import Element from 'element-ui'
import { Context, Plugin } from '@nuxt/types'

const AxiosMsgPlugin: Plugin = ({ $axios }: Context, inject) => {
  const $$axios = new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get(target, key) {
        return function (...args: string[]) {
          return ($axios as any)[key](...args).catch((e: Error) => {
            Element.Message.error((e as any).msg || (e as unknown as string))
            return Promise.reject(e)
          })
        }
      },
    }
  )
  inject('$axios', $$axios)
}

export default AxiosMsgPlugin
