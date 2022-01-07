/* eslint-disable camelcase */
import type { GetterTree, MutationTree } from 'vuex'
import { pipeConstants } from '@/constants/PipeConstants'
import { NuxtState } from '@nuxt/types/app'
import { RootState } from '@/store/index'

// TODO 优化成父子级数据结构，使用 @Inject 和 @Provide
export const state = (): NuxtState => ({
  pipe_id: '',
  name: '',
  type: 0,
  provider: '',
  website: '',
  description: '',
  readme: '',
  resource_id: '',
  version: '',
  dockerfile: '',
  instruction: '',
  cwl: '',
  profile: '',
  content: null,
  create_at: '',
  updated_at: '',
  category: [],
  versions: [],
})

export type PipeModuleState = ReturnType<typeof state>

export const getters: GetterTree<PipeModuleState, RootState> = {
  isTool: (state) => state.type === pipeConstants.items.TYPE_TOOL,
  isApp: (state) => state.type === pipeConstants.items.TYPE_APP,
  // isDocker: (state) => state.type === pipeConstants.items.TYPE_DOCKER,
  // isWork: (state) => state.type === pipeConstants.items.TYPE_WORK,
  // isWorkflow: (state) => state.type === pipeConstants.items.TYPE_WORKFLOW,
  // isSoftware: (state) => [pipeConstants.items.TYPE_TOOL, pipeConstants.items.TYPE_APP].includes(state.type),
  // isOperation: (state) => [pipeConstants.items.TYPE_WORK, pipeConstants.items.TYPE_WORKFLOW].includes(state.type),
}

export const mutations: MutationTree<NuxtState> = {
  UPDATE_CURRENT_STORE(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}
