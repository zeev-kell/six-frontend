import PipeConstants from '@/constants/PipeConstants'

export const state = () => ({
  name: undefined,
  type: 0,
  provider: undefined,
  website: undefined,
  description: undefined,
  readme: undefined,
  resource_id: undefined,
  version: undefined,
  dockerfile: null,
  instruction: null,
  cwl: null,
  profile: null,
  content: undefined,
  create_at: undefined,
  updated_at: undefined,
  category: undefined,
  versions: [],
  _isLoaded: false,
})

export const mutations = {
  // 更新当前的 workflow
  UPDATE_CURRENT_WORKFLOW(state, item) {
    Object.keys(item).forEach((key) => {
      state[key] = item[key]
    })
    state._isLoaded = true
  },
}

export const getters = {
  isTool(state) {
    return state.type === PipeConstants.Constants.get('TYPE_TOOL')
  },
  isApp(state) {
    return state.type === PipeConstants.Constants.get('TYPE_APP')
  },
  isDocker(state) {
    return PipeConstants.Constants.get('TYPE_DOCKER') === state.type
  },
  isWork(state) {
    return PipeConstants.Constants.get('TYPE_WORK') === state.type
  },
  isWorkflow(state) {
    return PipeConstants.Constants.get('TYPE_WORKFLOW') === state.type
  },
  // 是否是软件应用
  isSoftware(state) {
    return [PipeConstants.Constants.get('TYPE_TOOL'), PipeConstants.Constants.get('TYPE_APP')].includes(state.type)
  },
  // 是否是运行工作
  isOperation(state) {
    return [PipeConstants.Constants.get('TYPE_WORK'), PipeConstants.Constants.get('TYPE_WORKFLOW')].includes(state.type)
  },
}
