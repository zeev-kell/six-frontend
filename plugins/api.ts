// 增加处理异常的 message 提示
import { Context, Plugin } from '@nuxt/types'
const request: { [index: string]: any } = {}

const ApiPlugin: Plugin = (context: Context, inject) => {
  const $api = new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get(target: never, serverName: string) {
        let api = request[serverName]
        if (!api) {
          // 还没加载
          api = import(/* webpackChunkName: "api-[request]" */ `@/assets/api/${serverName}.js`).then(function (ModuleClass) {
            request[serverName] = new ModuleClass.Module(context)
            return request[serverName]
          })
        }
        // 已经加载完毕，可正常使用
        if (!(api instanceof Promise)) {
          return api
        }
        // 正在加载，返回代理
        return new Proxy(
          {},
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get(target: never, method) {
              return function (...args: string[]) {
                return api.then(function (server: any) {
                  return server[method](...args)
                })
              }
            },
          }
        )
      },
    }
  )
  inject('api', $api)
}

export default ApiPlugin
