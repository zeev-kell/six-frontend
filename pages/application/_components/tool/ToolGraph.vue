<template>
  <div class="tool-graph h-100 el-row el-row--flex">
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
  import { DblclickPlugin } from '@/pages/application/_components/cwl-graph/plugins/dblclick-plugin'
  import WorkflowPanel from '@/pages/application/_components/cwl-graph/CwlParamsPanel'
  import cwlTool from '@/pages/application/_components/cwl-graph/CwlTool'
  import {
    SelectionPlugin,
    SVGArrangePlugin,
    SVGEdgeHoverPlugin,
    SVGNodeMovePlugin,
    Workflow as WorkflowGraph,
    ZoomPlugin,
  } from 'cwl-svg'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import { isType } from 'cwlts/models/helpers/utils'
  import { CommandLineToolFactory } from 'cwlts/models/generic/CommandLineToolFactory'
  import cwlMixin from '../cwl-graph/CwlMixin'

  export default {
    name: 'ToolGraph',
    components: { cwlTool, WorkflowPanel },
    mixins: [cwlMixin],
    watch: {
      cwlState(json) {
        this.dataModel = CommandLineToolFactory.from(json, 'document')
        // this.dataModel.onCommandLineResult((cmdResult) => {
        //   this.commandLineParts.next(cmdResult)
        // })
        this.dataModel.updateCommandLine()
        this.dataModel.setValidationCallback(this.afterModelValidation.bind(this))
        this.dataModel.validate().then(this.afterModelValidation.bind(this))

        this.workflowWrapper = WorkflowFactory.from({ cwlVersion: this.dataModel.cwlVersion })
        const step = this.workflowWrapper.addStepFromProcess(this.dataModel.serialize())
        if (this.dataModel.id) {
          this.workflowWrapper.changeStepId(step, this.dataModel.id)
        }
        // iterate through all inputs of the tool
        this.workflowWrapper.steps[0].in.forEach((input) => {
          if (isType(input, ['File', 'Directory'])) {
            // create inputs from file ports
            this.workflowWrapper.createInputFromPort(input)
          } else {
            // everything else should be exposed (show up in the step inspector)
            this.workflowWrapper.exposePort(input)
          }
        })
        this.workflowWrapper.steps[0].out.forEach((output) => {
          this.workflowWrapper.createOutputFromPort(output)
        })
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [
          new SVGArrangePlugin(),
          new SVGEdgeHoverPlugin(),
          new SelectionPlugin(),
          new DblclickPlugin(),
          new ZoomPlugin(),
          new SVGNodeMovePlugin(),
          ...this.plugins,
        ]
        this.workflow = new WorkflowGraph({
          editingEnabled: !this.readonly,
          model: this.workflowWrapper,
          svgRoot: this.$refs.svg,
          plugins,
        })
        const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        if (arranger) arranger.arrange()
      },
    },
  }
</script>
