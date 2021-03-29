<template>
  <div class="cwl-graph">
    <tool-graph
      v-if="isTool"
      ref="cwl"
      :item="item"
      :config-type="configType"
      :cwl="item.cwl"
      :readonly="readonly"
      :tools="tools"
    />
    <workflow-graph
      v-else
      ref="cwl"
      :item="item"
      :config-type="configType"
      :cwl="item.cwl"
      :readonly="readonly"
      :tools="tools"
    />
  </div>
</template>

<script type="text/babel">
  import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
  import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
  import 'cwl-svg/src/plugins/selection/theme.dark.scss'
  import PipeConstants from '@/constants/PipeConstants'
  import ToolGraph from '@/pages/application/_components/tool/ToolGraph'
  import WorkflowGraph from '@/pages/application/_components/workflow/WorkflowGraph'
  export default {
    name: 'CwlGraph',
    components: {
      ToolGraph,
      WorkflowGraph,
    },
    props: {
      item: {
        type: Object,
        default: null,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      configType: {
        type: String,
        default: 'params',
      },
      tools: {
        type: [String, Array],
        default: undefined,
      },
    },
    computed: {
      isTool() {
        return this.item?.type ? this.item?.type === PipeConstants.Constants.TYPE_TOOL : true
      },
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
  .cwl-graph {
    background: #3c3c3c;
  }
</style>
