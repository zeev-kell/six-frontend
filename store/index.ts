import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'
import vue from 'vue'

export const state = () => ({
  helpMenus: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<NuxtState, NuxtState> = {}

export const mutations: MutationTree<NuxtState> = {
  SET_USER_INFO(state, user) {
    if (state.auth !== null) {
      vue.set(state.auth, 'user', user)
    }
  },
  SET_HELP_MENUS(state, helpMenus) {
    state.helpMenus = helpMenus
  },
}

export const actions: ActionTree<NuxtState, NuxtState> = {
  // 初始化服务端的信息，only from the server-side
  // nuxtServerInit({ commit }, { req, app }) {},
  // 初始化客户端的信息，需要自己手动触发
  nuxtClientInit({ commit, rootGetters }) {
    if (rootGetters['user/loggedIn']) {
      const user = localStorage.getItem('auth.user')
      if (user) {
        commit('SET_USER_INFO', JSON.parse(user))
      }
    }
  },
}
