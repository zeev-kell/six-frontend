import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import type { DirectiveFunction } from 'vue/types/options'
import { userConstants } from '@/constants/UserConstants'

const DirectivePlugin: Plugin = ({ store }, inject) => {
  const pluginFunction = function (value: number): DirectiveFunction {
    return function (el) {
      const permissions = store.getters && store.getters['user/permissions']
      const hadPermissive = permissions & value
      if (!hadPermissive) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
  const create: DirectiveFunction = pluginFunction(userConstants.items.CAN_CREATE as number)
  Vue.use({
    install(Vue) {
      Vue.directive('create', {
        inserted: create,
        update: create,
      })
    },
  })
}
export default DirectivePlugin
