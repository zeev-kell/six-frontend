import Vue from 'vue'
const roles = ['editor', 'admin']
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    // 聚焦元素
    // eslint-disable-next-line no-console
    console.log(el, 'el')
    el.focus()
  },
})
Vue.directive('permission', {
  inserted(el, binding, vnode) {
    const { value } = binding
    if (value && Array.isArray(value) && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  },
})
