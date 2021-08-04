const request = {}
export default (context, inject) => {
  const $api = new Proxy(
    {},
    {
      get(target, serverName) {
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
            get(target, method) {
              return function (...args) {
                return api.then(function (server) {
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
