// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'
import vue from 'vue'

// TODO 优化成父子级数据结构，使用 @Inject 和 @Provide
export const state = (): NuxtState => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  SET_USER_INFO(state, user) {
    if (state.auth !== null) {
      vue.set(state.auth, 'user', user)
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  // 初始化服务端的信息，only from the server-side
  // nuxtServerInit({ commit }, { req, app }) {},
  // 初始化客户端的信息，需要自己手动触发
  nuxtClientInit({ commit, rootGetters }) {
    if (rootGetters['user/loggedIn']) {
      const user = localStorage.getItem('auth.user')
      if (user) {
        commit('SET_USER_INFO', JSON.parse(user))
      }
      setTimeout(() => {
        if (document.documentElement.clientWidth <= 991) {
          commit('system/SET_MOBILE')
        }
      })
    }
  },
}

// TODO 过多的 store 对象，优化成父子级数据结构
