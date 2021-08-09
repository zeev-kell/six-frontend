/* eslint-disable camelcase */
import { GetterTree, MutationTree } from 'vuex'
import PipeConstants from '@/constants/PipeConstants'
import { NuxtState } from '@nuxt/types/app'

export const state = () => ({
  pipe_id: null,
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

export const getters: GetterTree<PipeModuleState, NuxtState> = {
  isTool: (state) => state.type === PipeConstants.Constants.get('TYPE_TOOL'),
  isApp: (state) => state.type === PipeConstants.Constants.get('TYPE_APP'),
  isDocker: (state) => state.type === PipeConstants.Constants.get('TYPE_DOCKER'),
  isWork: (state) => state.type === PipeConstants.Constants.get('TYPE_WORK'),
  isWorkflow: (state) => state.type === PipeConstants.Constants.get('TYPE_WORKFLOW'),
  // 是否是软件应用
  isSoftware: (state) => [PipeConstants.Constants.get('TYPE_TOOL'), PipeConstants.Constants.get('TYPE_APP')].includes(state.type),
  isOperation: (state) => [PipeConstants.Constants.get('TYPE_WORK'), PipeConstants.Constants.get('TYPE_WORKFLOW')].includes(state.type),
}

export const mutations: MutationTree<NuxtState> = {
  UPDATE_CURRENT_WORKFLOW(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}
