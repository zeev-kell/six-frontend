import Element from 'element-ui'
import { NuxtState } from '@nuxt/types/app'
import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/store/index'

export const state = (): NuxtState => {
  return {
    avatar_url: 'https://www.sixoclock.net/resources/pics/',
    coins: null,
    creations: null,
    description: '一个测试',
    email: 'r_d@sixoclock.net',
    id: 8,
    last_login_at: '2021-09-09 02:07:24',
    nickname: 'nick',
    phone: '12345678910',
    public_email: 'info@sixoclock.net',
    registered_at: '2021-04-26 21:42:25',
    status: 1,
    updated_at: '2021-09-09 02:07:24',
  }
}

export type UserModuleState = ReturnType<typeof state>

export const mutations: MutationTree<NuxtState> = {
  // 更新当前用户的信息
  UPDATE_USERINFO(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}

export const getters: GetterTree<UserModuleState, RootState> = {
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
}

export const actions: ActionTree<UserModuleState, RootState> = {
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
  // 更新当前用户的信息
  async ACTION_GET_INFO({ commit }): Promise<any> {
    const user = await this.$api.user.getUserInfo()
    commit('UPDATE_USERINFO', user)
  },
}
