<template>
  <div class="graph-index">
    <component :is="graphComponent" ref="graph" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import '~/pages/application/_components/graph/_theme.scss'
import GraphWorkflow from '@/pages/_components/Graph/GraphWorkflow.vue'
import GraphTool from '@/pages/_components/Graph/GraphTool.vue'
import { Component, Vue } from 'vue-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'

@Component({
  components: {
    GraphWorkflow,
    GraphTool,
  },
})
export default class GraphIndex extends Vue {
  $refs!: {
    cwl: GraphWorkflow | GraphTool
  }

  // 根据当前类型实例化不同的组件
  get graphComponent(): string {
    const isTool = false
    return isTool ? 'graph-tool' : 'graph-workflow'
  }

  // 执行 子组件 方法
  dispatchAction(action: string, ...args: string[]): any {
    return (this.$refs.cwl as unknown as HTMLFormElement)[action](...args)
  }

  // 获取 子组件 属性
  getAttributeAction(attr: string): any {
    return (this.$refs.cwl as unknown as HTMLFormElement)[attr]
  }

  mounted(): void {
    // 事件转发到子组件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$on(GraphEvent.Dispatch, (event: string, ...arg: any[]) => {
      console.log('onDispatchEvent', event)
      this.$refs.cwl.$emit(event, ...arg)
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
