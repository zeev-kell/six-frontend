import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { Route } from 'vue-router'
import { ComponentOptions } from 'vue/types/options'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
// noinspection TypeScriptUnresolvedVariable
if (!Vue.__i18n_mixin__) {
  // noinspection TypeScriptUnresolvedVariable
  Vue.__i18n_mixin__ = true

  Vue.mixin({
    beforeCreate() {
      const filters = this.$options.filters as { [index: string]: any }
      if (filters.t === undefined) {
        filters.t = (key: string) => {
          return this.$i18n.t(key)
        }
      }
    },
    beforeDestroy() {
      const filters = this.$options.filters
      delete filters.t
    },
  } as ComponentOptions<Vue>)
}

// 处理路由的语言前缀

const i18nRouterPlugin: Plugin = ({ app }, inject) => {
  const $I18nRouter = new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get(target, key) {
        return function (route: Route, ...args: string[]) {
          return (app.router as any)[key](app.localePath(route as any), ...args)
        }
      },
    }
  )
  inject('I18nRouter', $I18nRouter)
}

export default i18nRouterPlugin
