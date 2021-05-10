// 处理前缀 application
export default ({ $router }, inject) => {
  const $appRouter = new Proxy(
    {},
    {
      get(target, key) {
        return function (...args) {
          return $router[key](...args)
        }
      },
    }
  )
  inject('$appRouter', $appRouter)
}
