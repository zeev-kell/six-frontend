import vue from 'vue'
import { MutationTree } from 'vuex'
import { RootState } from '@/types/store'

const mutations: MutationTree<RootState> = {
  SET_USER_INFO(state, user) {
    console.log(user)
    state.auth.user = user
  },
  SET_HELP_MENUS(state, helpMenus) {
    state.helpMenus = helpMenus
  },
}
export default mutations
