<template>
  <div class="workflow-graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" oncontextmenu="return false"></svg>
      <cwl-tool :workflow="workflow" />
    </div>
    <transition name="el-fade-in-linear">
      <workflow-panel ref="panel" :workflow="workflow" :readonly="readonly" />
    </transition>
  </div>
</template>

<script type="text/babel">
  import cwlMixin from '@/pages/application/_components/cwl-graph/CwlMixin'
  import WorkflowPanel from '@/pages/application/_components/cwl-graph/CwlParamsPanel'
  import cwlTool from '@/pages/application/_components/cwl-graph/CwlTool'
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, Workflow, ZoomPlugin } from 'cwl-svg'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import { DblclickPlugin } from '../cwl-graph/plugins/dblclick-plugin'

  export default {
    name: 'WorkflowGraph',
    components: { cwlTool, WorkflowPanel },
    mixins: [cwlMixin],
    watch: {
      cwlState(json) {
        this.dataModel = WorkflowFactory.from(json)
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
      },
    },
  }
</script>
