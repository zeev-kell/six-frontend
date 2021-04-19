<template>
  <div class="graph-index">
    <graph-commandline
      v-if="isTool"
      ref="cwl"
      :item="item"
      :config-type="configType"
      :cwl="item.cwl"
      :readonly="readonly"
      :tools="tools"
    />
    <graph-workflow
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
  import GraphCommandline from '@/pages/application/_components/graph/GraphCommandline'
  import GraphWorkflow from '@/pages/application/_components/graph/GraphWorkflow'
  export default {
    name: 'CwlGraph',
    components: {
      GraphCommandline,
      GraphWorkflow,
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
        return this.item?.type ? this.item.type === PipeConstants.Constants.get('TYPE_TOOL') : true
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
  .graph-index {
    background: #3c3c3c;
  }
</style>
