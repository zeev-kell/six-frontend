import Vue from 'vue'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__i18n_mixin__) {
  Vue.__i18n_mixin__ = true
  Vue.mixin({
    beforeCreate() {
      const filters = this.$options.filters
      if (typeof filters.t === 'undefined') {
        filters.t = (key) => {
          return this.$i18n.t(key)
        }
      }
    },
    beforeDestroy() {
      const filters = this.$options.filters
      delete filters.t
    },
  })
}

// 处理路由的语言前缀
export default ({ app }, inject) => {
  const $I18nRouter = new Proxy(
    {},
    {
      get(target, key) {
        return function (route, ...args) {
          return app.router[key](app.localePath(route), ...args)
        }
      },
    }
  )
  inject('I18nRouter', $I18nRouter)
}
