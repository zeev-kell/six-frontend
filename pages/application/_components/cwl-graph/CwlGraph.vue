<template>
  <div class="cwl-graph">
    <tool-graph
      v-if="isTool"
      ref="cwl"
      :config-type="configType"
      :cwl="item.cwl"
      :readonly="readonly"
      @workflow-changed="onWorkflowChanged"
    />
    <workflow-graph
      v-else
      ref="cwl"
      :config-type="configType"
      :cwl="item.cwl"
      :readonly="readonly"
      @workflow-changed="onWorkflowChanged"
    />
  </div>
</template>

<script type="text/babel">
  import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
  import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
  import 'cwl-svg/src/plugins/selection/theme.dark.scss'
  import PipeConstants from '@/constants/PipeConstants'
  export default {
    name: 'CwlGraph',
    components: {
      ToolGraph: () => import('@/pages/application/_components/tool/ToolGraph'),
      WorkflowGraph: () => import('@/pages/application/_components/workflow/WorkflowGraph'),
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
    },
    data() {
      return {
        workflow: null,
      }
    },
    computed: {
      isTool() {
        return this.item?.type ? this.item?.type === PipeConstants.Constants.TYPE_TOOL : true
      },
    },
    methods: {
      onWorkflowChanged(workflow) {
        this.workflow = workflow
      },
      serialize(...arg) {
        return this.$refs.cwl.serialize(...arg)
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
