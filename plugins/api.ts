import { Context, Plugin } from '@nuxt/types'
const request: { [index: string]: any } = {}
let $axios: any

const ApiPlugin: Plugin = (context: Context, inject) => {
  $axios = context.$axios
  const $api = new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get(target: never, serverName: string) {
        let Module: any = request[serverName]
        if (!Module) {
          // 还没加载
          Module = import(/* webpackChunkName: "api-[request]" */ `@/assets/api/${serverName}.ts`).then(function (ModuleClass) {
            request[serverName] = ModuleClass.Module
            return new request[serverName]({ $axios })
          })
        }
        // 已经加载完毕，可正常使用
        if (!(Module instanceof Promise)) {
          return new Module({ $axios })
        }
        // 正在加载，返回代理
        return new Proxy(
          {},
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get(target: never, method) {
              return function (...args: string[]) {
                return Module.then(function (server: any) {
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
