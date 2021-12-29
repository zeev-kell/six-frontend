<template>
  <div class="graph graph-index">
    <component :is="graphComponent" ref="graph" :content="content" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import './_index.scss'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import GraphWorkflow from '@/pages/_components/Graph/GraphWorkflow.vue'
import GraphTool from '@/pages/_components/Graph/GraphTool.vue'
import { GraphEvent } from '@/constants/GraphEvent'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'

@Component({
  components: {
    GraphWorkflow,
    GraphTool,
  },
})
export default class GraphIndex extends Vue {
  $refs!: {
    graph: GraphWorkflow | GraphTool
  }

  @Prop({
    required: true,
    validator(value: any): boolean {
      return !!value
    },
  })
  item!: PipeModel

  get content(): V1Workflow | CommandLineTool {
    return this.item.content
  }
  // 根据当前类型实例化不同的组件
  get graphComponent(): string {
    if ((this.item.type as unknown) !== undefined) {
      return this.item.type === pipeConstants.items.TYPE_TOOL ? 'graph-tool' : 'graph-workflow'
    }
    return this.item.content?.class === 'CommandLineTool' ? 'graph-tool' : 'graph-workflow'
  }

  // 执行 子组件 方法
  dispatchAction(action: string, ...args: string[]): any {
    return (this.$refs.graph as unknown as HTMLFormElement)[action](...args)
  }

  mounted(): void {
    // 事件转发到子组件
    this.$on(GraphEvent.Dispatch, (eventName: string, ...arg: any[]) => {
      console.log('GraphIndex onDispatchEvent', eventName)
      this.$refs.graph.$emit(eventName, ...arg)
    })
  }
  beforeDestroy(): void {
    this.$off(GraphEvent.Dispatch)
  }
}
</script>
