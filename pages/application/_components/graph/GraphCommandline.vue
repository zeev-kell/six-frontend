<script type="text/babel">
import { SVGJobFileDropPlugin } from '@/pages/application/_components/graph/plugins/job-file-drop'
import { SVGRequiredInputMarkup } from '@/pages/application/_components/graph/plugins/required-input-markup'
import { SVGNodeMovePlugin, Workflow } from 'cwl-svg'
import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
import { CommandLineToolFactory } from 'cwlts/models/generic/CommandLineToolFactory'
import GraphMixin from '@/pages/application/_components/graph/GraphMixin'
import { isType } from 'cwlts/models/helpers/utils'

export default {
  name: 'GraphCommandline',
  mixins: [GraphMixin],
  data() {
    return {
      workflowWrapper: null,
    }
  },
  mounted() {
    this.$watch('jobControl', {
      deep: true,
      handler(jobControl) {
        const job = this.normalizeJob(jobControl.value)
        this.workflow?.getPlugin(SVGJobFileDropPlugin)?.updateToJobState(job)
        const markupPlugin = this.workflow?.getPlugin(SVGRequiredInputMarkup)
        if (markupPlugin) {
          const missingInputConnectionIDs = this.workflow.model.inputs
            .filter((input) => !input.type.isNullable && (job[input.id] === null || job[input.id] === undefined))
            .map((input) => input.connectionId)
          markupPlugin.markMissing(...missingInputConnectionIDs)
        }
      },
    })
  },
  methods: {
    createDataModel(json) {
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
      // set job on the tool to be the actual job, so the command line is the real thing
      this.dataModel.setJobInputs()
    },
    createModel(json) {
      this.createDataModel(json)
      const plugins = this.defaultPlugins
      plugins.push(new SVGNodeMovePlugin())
      this.workflow = new Workflow({
        editingEnabled: !this.readonly,
        model: this.workflowWrapper,
        svgRoot: this.$refs.svg,
        plugins,
      })
    },
  },
}
</script>
