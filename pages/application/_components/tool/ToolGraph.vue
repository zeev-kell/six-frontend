<template>
  <div class="tool-graph h-100 el-row el-row--flex">
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
  import { DblclickPlugin } from '@/pages/application/_components/workflow/plugins/dblclick-plugin'
  import WorkflowPanel from '@/pages/application/_components/workflow/WorkflowPanel'
  import cwlTool from '@/pages/application/_components/cwlTool'
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
  import cwlMixin from '../cwl-mixin'

  export default {
    name: 'ToolGraph',
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
        workflow: null,
        cwlState: null,
        workflowWrapper: null,
        appID: undefined,
      }
    },
    watch: {
      cwl() {
        this.cwlState = this.load(this.cwl)
      },
      workflow() {
        this.$emit('workflow-changed', this.workflow)
      },
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

<style scoped lang="scss" rel="stylesheet"></style>
