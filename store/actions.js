import Element from 'element-ui'
const actions = {
  // 初始化服务端的信息，only from the server-side
  // nuxtServerInit({ commit }, { req, app }) {},
  // 初始化客户端的信息，需要自己手动触发
  nuxtClientInit({ getters, commit, store }) {
    if (getters.loggedIn) {
      const user = localStorage.getItem('auth.user')
      if (user) {
        commit('SET_USER_INFO', JSON.parse(user))
      }
    }
    // eslint-disable-next-line no-console
    console.log(document.documentElement.clientWidth)
    if (process.client && document.documentElement.clientWidth <= 991) {
      store.commit('SET_MOBILE')
    }
  },
  // 登录，目前需要手动保存 user 信息
  ACTION_LOGIN({ commit }, data) {
    return this.$auth
      .loginWith('local', { data })
      .then((response) => {
        this.$auth.setUser(response.data.data)
        this.$auth.$storage.setLocalStorage('user', response.data.data)
      })
      .catch((e) => {
        Element.Message.error(e.msg || e)
        return Promise.reject(e)
      })
  },
  // 登出，无论是否异常，清空自身保存的 user 信息
  ACTION_LOGOUT() {
    return this.$auth
      .logout()
      .finally(() => {
        this.$auth.setUser(null)
        this.$auth.$storage.setLocalStorage('user', undefined)
      })
      .catch(() => {
        this.$auth.setUser(null)
        this.$auth.$storage.setLocalStorage('user', null)
      })
  },
}
export default actions
