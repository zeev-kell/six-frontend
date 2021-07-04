<template>
  <div class="graph-index">
    <component :is="graphComponent" ref="graph" :item="item" v-bind="$attrs" :cwl="item.content" v-on="$listeners" />
  </div>
</template>

<script type="text/babel">
import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
import 'cwl-svg/src/plugins/selection/theme.dark.scss'
import { GraphEvent } from '@/constants/GraphEvent'
import PipeConstants from '@/constants/PipeConstants'
export default {
  name: 'GraphIndex',
  components: {
    GraphCommandline: () => import('@/pages/application/_components/graph/GraphCommandline'),
    GraphWorkflow: () => import('@/pages/application/_components/graph/GraphWorkflow'),
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {
    graphComponent() {
      // 根据当前类型实例化不同的组件
      const type = this.item?.type
      const isTool = type ? type === PipeConstants.Constants.get('TYPE_TOOL') : true
      return isTool ? 'graph-commandline' : 'graph-workflow'
    },
  },
  mounted() {
    // 事件转发到子组件
    this.$on(GraphEvent.Dispatch, (...arg) => {
      // eslint-disable-next-line no-console
      console.log('onDispatchEvent', arg[0])
      this.$refs.graph?.$emit(...arg)
    })
  },
  methods: {
    exportCwl(...arg) {
      return this.$refs.cwl.exportCwl(...arg)
    },
  },
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
