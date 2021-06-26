// 处理路由的语言前缀
export default ({ app }, inject) => {
  const $I18nRouter = new Proxy(
    {},
    {
      get(target, key) {
        return function (...args) {
          return app.router[key](app.localePath(...args))
        }
      },
    }
  )
  inject('I18nRouter', $I18nRouter)
}
