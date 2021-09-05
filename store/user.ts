import type { GetterTree, ActionTree } from 'vuex'
import Element from 'element-ui'
import { NuxtState } from '@nuxt/types/app'

export const state = () => ({})

export type UserModuleState = ReturnType<typeof state>

export const getters: GetterTree<UserModuleState, NuxtState> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  username: (state, getters, rootState) => rootState.auth?.user?.uname,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  email: (state, getters, rootState) => rootState.auth?.user?.email,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId: (state, getters, rootState) => rootState.auth?.user?.uid,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loggedIn: (state, getters, rootState) => rootState.auth?.loggedIn,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  role: (state, getters, rootState) => rootState.auth?.user?.admin,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  permissions: (state, getters, rootState) => rootState.auth?.user?.permissions,
  // eslint-disable-next-line camelcase
  avatarUrl: (state, getters, rootState) => rootState.auth?.user?.avatar_url,
}

export const actions: ActionTree<UserModuleState, NuxtState> = {
  // 登录，目前需要手动保存 user 信息
  async ACTION_LOGIN(store, data) {
    return await this.$auth
      .loginWith('local', { data })
      .then((response: any) => {
        this.$auth.setUser(response.data.data)
        this.$auth.$storage.setLocalStorage('user', response.data.data)
      })
      .catch((e: any) => {
        Element.Message.error(e.msg || e)
        return Promise.reject(e)
      })
  },

  // 登出，无论是否异常，清空自身保存的 user 信息
  async ACTION_LOGOUT(): Promise<any> {
    return await this.$auth
      .logout()
      .finally(() => {
        this.$auth.setUser(null)
        this.$auth.$storage.setLocalStorage('user', null)
      })
      .catch(() => {
        this.$auth.setUser(null)
        this.$auth.$storage.setLocalStorage('user', null)
      })
  },
}
