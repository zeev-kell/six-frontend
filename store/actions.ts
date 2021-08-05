import { ActionTree } from 'vuex'
import { RootState } from '@/types/store'

const actions: ActionTree<RootState, RootState> = {
  // 初始化服务端的信息，only from the server-side
  // nuxtServerInit({ commit }, { req, app }) {},
  // 初始化客户端的信息，需要自己手动触发
  nuxtClientInit({ getters, commit }) {
    if (getters.loggedIn) {
      const user = localStorage.getItem('auth.user')
      if (user) {
        commit('SET_USER_INFO', JSON.parse(user))
      }
    }
    if (document.documentElement.clientWidth <= 991) {
      commit('system/SET_MOBILE')
    }
  },
}
export default actions
