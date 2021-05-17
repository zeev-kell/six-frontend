import vue from 'vue'
export default {
  SET_BODY_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
  SET_USER_INFO(state, user) {
    state.auth.user = user
    vue.set(state.auth, 'user', user)
  },
  SET_HELP_MENUS(state, helpMenus) {
    state.helpMenus = helpMenus
  },
}
