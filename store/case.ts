/* eslint-disable camelcase */
import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'
import { RootState } from '@/store/index'
import { ApiType } from '@/types/plugin'
import { CaseContent } from '@/types/model/Case'
import { pipeConstants } from '@/constants/PipeConstants'

export const state = (): NuxtState => ({
  resource_id: null,
  type: undefined,
  name: '',
  description: '',
  content: null,
  create_at: '',
  updated_at: '',
  instruction: '',
  status: undefined,
  readme: '',
  provider: '',
  category: [],
})

export type CaseModuleState = ReturnType<typeof state>

export const getters: GetterTree<CaseModuleState, RootState> = {
  content(state): CaseContent | {} {
    if (state.content === '') {
      return {}
    }
    try {
      return JSON.parse(state.content)
    } catch (e) {
      console.log(e)
      return {}
    }
  },
  type(state, getters): string {
    return (getters.content?.workflow?.class === 'CommandLineTool' ? pipeConstants.items.TYPE_TOOL : pipeConstants.items.TYPE_WORKFLOW) as string
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
