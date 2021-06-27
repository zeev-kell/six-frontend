import PipeConstants from '@/constants/PipeConstants'

export const state = () => ({
  name: undefined,
  type: 0,
  provider: undefined,
  website: undefined,
  description: undefined,
  pipe_id: undefined,
  resource_id: undefined,
  version: undefined,
  dockerfile: null,
  instruction: null,
  cwl: null,
  profile: null,
  content: undefined,
  create_at: undefined,
  category: undefined,
  versions: [],
})

export const mutations = {
  // 更新当前的 workflow
  UPDATE_CURRENT_WORKFLOW(state, item) {
    Object.keys(item).forEach((key) => {
      state[key] = item[key]
    })
  },
}

export const getters = {
  isTool(state) {
    return state.type === PipeConstants.Constants.get('TYPE_TOOL') || state.type === PipeConstants.Constants.get('TYPE_APP')
  },
}
