import type { MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'

// TODO 优化成父子级数据结构，使用 @Inject 和 @Provide
export const state = (): NuxtState => ({
  validationState: {
    isValidCWL: false,
    isPending: true,
    errors: [],
    warnings: [],
  },
  jobValue: {},
  cleanSelection: 0,
})

export type GraphState = ReturnType<typeof state>

export const mutations: MutationTree<GraphState> = {
  SET_VALIDATION_STATE(state, validationState): void {
    state.validationState = validationState
  },
  SET_JOB_VALUE(state, jobValue = {}): void {
    state.jobValue = jobValue
  },
  CLEAN_SELECTION(state): void {
    state.cleanSelection++
  },
}
