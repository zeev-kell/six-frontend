import vue from 'vue'
import { MutationTree } from 'vuex'
import { RootState } from '@/types/store'

const mutations: MutationTree<RootState> = {
  SET_BODY_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
  SET_USER_INFO(state, user) {
    if (state.auth !== null) {
      vue.set(state.auth, 'user', user)
    }
  },
  SET_HELP_MENUS(state, helpMenus) {
    state.helpMenus = helpMenus
  },
  SET_MOBILE(state) {
    state.isMobile = true
  },
}
export default mutations
