<template>
  <div class="graph-index">
    <component :is="graphComponent" ref="graph" :content="content" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import '~/pages/application/_components/graph/_theme.scss'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import GraphWorkflow from '@/pages/_components/Graph/GraphWorkflow.vue'
import GraphTool from '@/pages/_components/Graph/GraphTool.vue'
import { GraphEvent } from '@/constants/GraphEvent'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import { GraphPlugin } from '@/types/graph'

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

  @Prop({ required: true })
  item!: PipeModel

  // 根据当前类型实例化不同的组件
  get graphComponent(): string {
    const isTool = this.item.type === pipeConstants.items.TYPE_TOOL
    return isTool ? 'graph-tool' : 'graph-workflow'
  }

  get content(): V1Workflow | CommandLineTool {
    return this.item.content
  }

  // 执行 子组件 方法
  dispatchAction(action: string, ...args: string[]): any {
    return (this.$refs.graph as unknown as HTMLFormElement)[action](...args)
  }
  // 获取 子组件 属性
  getAttributeAction(attr: string): any {
    return (this.$refs.graph as unknown as HTMLFormElement)[attr]
  }

  mounted(): void {
    // 事件转发到子组件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$on(GraphEvent.Dispatch, (event: string, ...arg: any[]) => {
      console.log('onDispatchEvent', event)
      this.$refs.graph.$emit(event, ...arg)
    })
  }
}
</script>

<style lang="scss" rel="stylesheet">
@import '_theme';
.scrollbar,
.el-tabs__content {
  overflow-y: auto;

  @include scroll-bar();
}
.graph-index {
  background: #3c3c3c;
}
</style>
