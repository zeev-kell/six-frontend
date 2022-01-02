/* eslint-disable camelcase */
import type { GetterTree, MutationTree } from 'vuex'
import { pipeConstants } from '@/constants/PipeConstants'
import { NuxtState } from '@nuxt/types/app'
import { RootState } from '@/store/index'

export const state = (): NuxtState => ({
  pipe_id: '',
  resource_id: '',
  name: '',
  type: 0,
  provider: '',
  website: '',
  description: '',
  readme: '',
  latest_rev: '',
  profile: '',
  content: null,
  create_at: '',
  updated_at: '',
  category: [],
  versions: [],
})

export type PipeRepositoryModuleState = ReturnType<typeof state>

export const getters: GetterTree<PipeRepositoryModuleState, RootState> = {
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
  UPDATE_CURRENT_STORE(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}
