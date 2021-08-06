/* eslint-disable camelcase */
import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import PipeConstants from '@/constants/PipeConstants'

@Module({
  name: 'pipe',
  stateFactory: true,
  namespaced: true,
})
export default class PipeModule extends VuexModule {
  pipe_id = null
  name = null
  type = 0
  provider = null
  website = null
  description = null
  readme = null
  resource_id = null
  version = null
  dockerfile = null
  instruction = null
  cwl = null
  profile = null
  content = null
  create_at = null
  updated_at = null
  category = null
  versions = []

  get isTool() {
    return this.type === PipeConstants.Constants.get('TYPE_TOOL')
  }
  get isApp() {
    return this.type === PipeConstants.Constants.get('TYPE_APP')
  }
  get isDocker() {
    return PipeConstants.Constants.get('TYPE_DOCKER') === this.type
  }
  get isWork() {
    return PipeConstants.Constants.get('TYPE_WORK') === this.type
  }
  get isWorkflow() {
    return PipeConstants.Constants.get('TYPE_WORKFLOW') === this.type
  }
  // 是否是软件应用
  get isSoftware() {
    return [PipeConstants.Constants.get('TYPE_TOOL'), PipeConstants.Constants.get('TYPE_APP')].includes(this.type)
  }
  // 是否是运行工作
  get isOperation() {
    return [PipeConstants.Constants.get('TYPE_WORK'), PipeConstants.Constants.get('TYPE_WORKFLOW')].includes(this.type)
  }

  @VuexMutation
  UPDATE_CURRENT_WORKFLOW(item: any) {
    Object.keys(item).forEach((key) => {
      ;(this as any)[key] = item[key]
    })
  }
}
