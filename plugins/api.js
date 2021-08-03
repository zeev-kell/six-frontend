const request = {}
export default (context, inject) => {
  // eslint-disable-next-line no-console
  console.log(1)
  const $api = new Proxy(
    {},
    {
      get(target, serverName) {
        let api = request[serverName]
        if (!api) {
          // 还没加载
          api = import(/* webpackChunkName: "api-[request]" */ `@/assets/api/${serverName}.js`).then(function (server) {
            request[serverName] = server
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
              return async function (...args) {
                return (await api)[method](...args)
              }
            },
          }
        )
      },
    }
  )
  inject('api', $api)
}
