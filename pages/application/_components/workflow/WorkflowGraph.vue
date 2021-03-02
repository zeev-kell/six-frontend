<template>
  <div class="workflow-graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" oncontextmenu="return false"></svg>
      <cwl-tool :workflow="workflow"></cwl-tool>
    </div>
    <transition name="el-fade-in-linear">
      <workflow-panel ref="panel" :workflow="workflow" :readonly="readonly"></workflow-panel>
    </transition>
  </div>
</template>

<script type="text/babel">
  import cwlMixin from '@/pages/application/_components/cwl-mixin'
  import WorkflowPanel from '@/pages/application/_components/workflow/WorkflowPanel'
  import cwlTool from '@/pages/application/_components/cwlTool'
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, Workflow, ZoomPlugin } from 'cwl-svg'
  import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
  import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
  import 'cwl-svg/src/plugins/selection/theme.dark.scss'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import { DblclickPlugin } from './plugins/dblclick-plugin'

  export default {
    name: 'WorkflowGraph',
    components: { cwlTool, WorkflowPanel },
    mixins: [cwlMixin],
    props: {
      cwl: {
        type: [Object, String],
        default: null,
        note: `The JSON object representing the CWL workflow to render`,
      },
      readonly: {
        type: Boolean,
        default: false,
        note: `True if the workflow is editable`,
      },
      plugins: {
        type: Array,
        default: () => [],
        note: `A list of CWL plugins to use in the CWL rendering`,
      },
    },
    data() {
      return {
        dataModel: null,
        workflow: null,
        cwlState: null,
      }
    },
    watch: {
      cwl() {
        this.cwlState = this.load(this.cwl)
      },
      workflow() {
        this.$emit('workflow-changed', this.workflow)
      },
      cwlState() {
        this.dataModel = WorkflowFactory.from(this.cwlState)
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [
          new SVGArrangePlugin(),
          new SVGEdgeHoverPlugin(),
          new SelectionPlugin(),
          new DblclickPlugin(),
          new ZoomPlugin(),
          ...this.plugins,
        ]
        this.workflow = new Workflow({
          editingEnabled: !this.readonly,
          model: this.dataModel,
          svgRoot: this.$refs.svg,
          plugins,
        })

        // 自动放缩 并且 调整排版
        const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        if (arranger) arranger.arrange()

        // 自动放缩到窗口大小
        // NOTE 如果这时候宽度高度不存在，会发生异常
        // this.workflow.fitToViewport()
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet">
  @import 'theme';
  .scrollbar,
  .el-tabs__content {
    overflow-y: auto;

    @include scroll-bar();
  }
  .workflow-graph {
    background: #3c3c3c;
  }
</style>
