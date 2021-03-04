<script type="text/babel">
  import { SVGArrangePlugin, SVGNodeMovePlugin, Workflow } from 'cwl-svg'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import { CommandLineToolFactory } from 'cwlts/models/generic/CommandLineToolFactory'
  import CwlGraphMixin from '@/pages/application/_components/cwl-graph/CwlGraphMixin'
  import { isType } from 'cwlts/models/helpers/utils'

  export default {
    name: 'ToolGraph',
    mixins: [CwlGraphMixin],
    data() {
      return {
        workflowWrapper: null,
        validationState: {},
      }
    },
    watch: {
      cwlState(json) {
        this.createWrapper(json)
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [...this.getDefaultPlugins(), new SVGNodeMovePlugin(), ...this.plugins]
        this.workflow = new Workflow({
          editingEnabled: !this.readonly,
          model: this.workflowWrapper,
          svgRoot: this.$refs.svg,
          plugins,
        })
        const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        if (arranger) arranger.arrange()
      },
    },
    methods: {
      createWrapper(json) {
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
      },
      afterModelValidation() {
        this.validationState = {
          ...this.validationState,
          errors: this.dataModel.errors || [],
          warnings: this.dataModel.warnings || [],
          isPending: false,
        }
      },
    },
  }
</script>
