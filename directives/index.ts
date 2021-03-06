import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import type { DirectiveFunction } from 'vue/types/options'
import { userConstants } from '@/constants/UserConstants'
import { DirectiveBinding } from 'vue/types/options'

const DirectivePlugin: Plugin = ({ store }) => {
  const pluginFunction = function (value: number): DirectiveFunction {
    return function (el, binding: DirectiveBinding) {
      const permissions = store.getters && store.getters['user/permissions']
      const hadPermissive = permissions & value
      if (!hadPermissive) {
        el.parentNode && el.parentNode.removeChild(el)
      }
      if (binding.value) {
        const username = store.getters && store.getters['user/username']
        if (username && binding.value && username !== binding.value) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    }
  }
  const create: DirectiveFunction = pluginFunction(userConstants.items.CAN_CREATE as number)
  const truncate: DirectiveFunction = function (el, binding) {
    const value = binding.value || ''
    el.innerHTML = value
    el.setAttribute('title', value)
  }
  Vue.use({
    install(Vue) {
      Vue.directive('create', {
        inserted: create,
        update: create,
      })
      Vue.directive('truncate', {
        inserted: truncate,
        update: truncate,
        bind(el) {
          el.classList.add('text-truncate')
        },
      })
    },
  })
}
export default DirectivePlugin
