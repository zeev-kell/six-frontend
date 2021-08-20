import type { MutationTree } from 'vuex'
import { AppValidityState } from '@/types/graph'

export const state = (): { validationState: AppValidityState } => ({
  validationState: {
    isValidCWL: false,
    isPending: true,
    errors: [],
    warnings: [],
  },
})

export type GraphState = ReturnType<typeof state>

export const mutations: MutationTree<GraphState> = {
  SET_VALIDATION_STATE(state, validationState): void {
    state.validationState = validationState
  },
}
