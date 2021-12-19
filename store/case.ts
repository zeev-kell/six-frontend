/* eslint-disable camelcase */
import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'
import { RootState } from '@/store/index'
import { ApiType } from '@/types/plugin'

export const state = (): NuxtState => ({
  id: null,
  resource_id: undefined,
  type: undefined,
  name: '',
  description: '',
  content: null,
})

export type CaseModuleState = ReturnType<typeof state>

export const getters: GetterTree<CaseModuleState, RootState> = {
  items: (state) => {
    return JSON.parse(state.content)
  },
}

export const mutations: MutationTree<NuxtState> = {
  UPDATE_CURRENT_STORE(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}

export const actions: ActionTree<RootState, CaseModuleState> = {
  async refresh({ commit }, payload) {
    const item = await (this.$api as ApiType).case.get(payload)
    commit('UPDATE_CURRENT_STORE', item)
  },
}
