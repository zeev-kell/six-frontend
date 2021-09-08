import type { MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'

export const state = (): NuxtState => ({
  validationState: {
    isValidCWL: false,
    isPending: true,
    errors: [],
    warnings: [],
  },
  jobValue: {},
})

export type GraphState = ReturnType<typeof state>

export const mutations: MutationTree<GraphState> = {
  SET_VALIDATION_STATE(state, validationState): void {
    state.validationState = validationState
  },
  SET_JOB_VALUE(state, jobValue): void {
    state.jobValue = jobValue
  },
}
