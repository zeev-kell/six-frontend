/* eslint-disable camelcase */
import type { GetterTree, MutationTree } from 'vuex'
import { datumConstants } from '@/constants/DatumConstants'
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
  isFormat: (state) => state.type === datumConstants.items.TYPE_FORMAT,
  isData: (state) => state.type === datumConstants.items.TYPE_DATA,
  isDataPackage: (state) => state.type === datumConstants.items.TYPE_DATA_PACKAGE,
}

export const mutations: MutationTree<NuxtState> = {
  UPDATE_CURRENT_DATUM(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}
