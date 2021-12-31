import Element from 'element-ui'
import { NuxtState } from '@nuxt/types/app'
import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/store/index'

export const state = (): NuxtState => ({
  avatar_url: '',
  coins: null,
  creations: null,
  description: '',
  email: '',
  id: null,
  last_login_at: '',
  nickname: '',
  phone: '',
  public_email: '',
  registered_at: '',
  status: null,
  updated_at: '',
})

export type UserModuleState = ReturnType<typeof state>

export const mutations: MutationTree<NuxtState> = {
  // 更新当前用户的信息
  UPDATE_USERINFO(state, item: any): void {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}

export const getters: GetterTree<UserModuleState, RootState> = {
  // eslint-disable-next-line camelcase
  userId: (state, getters, rootState) => rootState.auth.user?.user_id,
  username: (state, getters, rootState) => rootState.auth.user?.username,
  email: (state, getters, rootState) => rootState.auth.user?.email,
  permissions: (state, getters, rootState) => rootState.auth.user?.permissions,
  loggedIn: (state, getters, rootState) => rootState.auth.loggedIn,
}

export const actions: ActionTree<UserModuleState, RootState> = {
  // 登录，目前需要手动保存 user 信息
  async ACTION_LOGIN(store, data) {
    return await this.$auth
      .loginWith('local', { data })
      .then((response: any) => {
        const data = response.data.data
        const user = this.$auth.user as any
        // eslint-disable-next-line camelcase
        user.refreshToken = data.refresh_token
        this.$auth.$storage.setLocalStorage('user', user)
      })
      .catch((e: any) => {
        Element.Message.error(e.msg || e)
        return Promise.reject(e)
      })
  },
  // 登出，无论是否异常，清空自身保存的 user 信息
  async ACTION_LOGOUT(): Promise<any> {
    return await this.$auth.logout().catch(() => {
      this.$auth.setUser(false)
    })
  },
  ACTION_CLEAN_LOGIN(): void {
    this.$auth.setUser(false)
    this.$auth.$storage.setLocalStorage('user', null)
  },
  // 更新当前用户的信息
  async ACTION_GET_INFO({ commit }): Promise<any> {
    const user = await this.$api.user.getInfo()
    commit('UPDATE_USERINFO', user)
  },
}
