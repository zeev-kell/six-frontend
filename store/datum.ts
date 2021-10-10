/* eslint-disable camelcase */
import type { GetterTree, MutationTree } from 'vuex'
import { pipeConstants } from '@/constants/PipeConstants'
import { NuxtState } from '@nuxt/types/app'
import { RootState } from '@/store/index'

export const state = (): NuxtState => ({
  data_id: null,
  name: null,
  type: 0,
  provider: null,
  website: null,
  description: null,
  readme: null,
  resource_id: null,
  version: null,
  dockerfile: null,
  instruction: null,
  cwl: null,
  profile: null,
  content: null,
  create_at: null,
  updated_at: null,
  category: null,
  versions: [],
})

export type PipeModuleState = ReturnType<typeof state>

export const getters: GetterTree<PipeModuleState, RootState> = {
  isTool: (state) => state.type === pipeConstants.items.TYPE_TOOL,
  isApp: (state) => state.type === pipeConstants.items.TYPE_APP,
  isDocker: (state) => state.type === pipeConstants.items.TYPE_DOCKER,
  isWork: (state) => state.type === pipeConstants.items.TYPE_WORK,
  isWorkflow: (state) => state.type === pipeConstants.items.TYPE_WORKFLOW,
  // 是否是软件应用
  isSoftware: (state) => [pipeConstants.items.TYPE_TOOL, pipeConstants.items.TYPE_APP].includes(state.type),
  isOperation: (state) => [pipeConstants.items.TYPE_WORK, pipeConstants.items.TYPE_WORKFLOW].includes(state.type),
}

export const mutations: MutationTree<NuxtState> = {
  UPDATE_CURRENT_DATUM(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}
