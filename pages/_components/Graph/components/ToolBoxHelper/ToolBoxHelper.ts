import { Component, Vue } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'

@Component
export default class ToolBoxHelper extends Vue {
  // 事件转发到 ToolBox
  toolEvent(...args: any[]): void {
    this.$emit(GraphEvent.ToolEvent, ...args)
  }
}
