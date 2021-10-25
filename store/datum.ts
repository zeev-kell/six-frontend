/* eslint-disable camelcase */
import type { Module, GetterTree, MutationTree } from 'vuex'
import { datumConstants } from '@/constants/DatumConstants'
import { NuxtState } from '@nuxt/types/app'
import { RootState } from '@/store/index'
import { yamlToJson } from '@/pages/_components/Graph/helpers/YamlHandle'

export const state = (): NuxtState => ({
  data_id: null,
  name: null,
  version: null,
  type: 0,
  content: null,
  provider: null,
  website: null,
  description: null,
  category: null,
  versions: [],
  status: null,
  resource_id: null,
  create_at: null,
})

export type PipeModuleState = ReturnType<typeof state>

export const getters: GetterTree<PipeModuleState, RootState> = {
  isFormat: (state) => state.type === datumConstants.items.TYPE_FORMAT,
  isData: (state) => state.type === datumConstants.items.TYPE_DATA,
  isDataPackage: (state) => state.type === datumConstants.items.TYPE_DATA_PACKAGE,
  items: (state, getters) => {
    const items = yamlToJson(state.content)
    if (getters.isData) {
      return items ? [items] : []
    }
    return items?.resources || []
  },
}

export const mutations: MutationTree<NuxtState> = {
  UPDATE_CURRENT_DATUM(state, item: any) {
    Object.keys(item).forEach((key) => {
      ;(state as any)[key] = item[key]
    })
  },
}
