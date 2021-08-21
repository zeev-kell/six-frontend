import type { MutationTree } from 'vuex'

export const state = () => ({
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
