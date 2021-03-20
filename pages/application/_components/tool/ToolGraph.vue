<script type="text/babel">
  import { SVGJobFileDropPlugin } from '@/pages/application/_components/cwl-graph/plugins/job-file-drop'
  import { SVGRequiredInputMarkup } from '@/pages/application/_components/cwl-graph/plugins/required-input-markup'
  import { SVGArrangePlugin, SVGNodeMovePlugin, Workflow } from 'cwl-svg'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import { CommandLineToolFactory } from 'cwlts/models/generic/CommandLineToolFactory'
  import CwlGraphMixin from '@/pages/application/_components/cwl-graph/CwlGraphMixin'
  import { JobHelper } from 'cwlts/models/helpers/JobHelper'
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
        this.recreateModel(json)
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [...this.getDefaultPlugins(), new SVGNodeMovePlugin(), ...this.plugins]
        if (this.configType === 'run') {
          plugins.push(new SVGJobFileDropPlugin(), new SVGRequiredInputMarkup())
        }
        this.workflow = new Workflow({
          editingEnabled: !this.readonly,
          model: this.workflowWrapper,
          svgRoot: this.$refs.svg,
          plugins,
        })
        const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        if (arranger) arranger.arrange()
        this.updateJob({})
      },
    },
    mounted() {
      this.$watch('jobControl', {
        deep: true,
        handler(jobControl) {
          const job = this.normalizeJob(jobControl.value)
          this.workflow?.getPlugin(SVGJobFileDropPlugin)?.updateToJobState(job)
          const markupPlugin = this.workflow.getPlugin(SVGRequiredInputMarkup)
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
      recreateModel(json) {
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
      afterModelValidation() {
        this.validationState = {
          ...this.validationState,
          errors: this.dataModel.errors || [],
          warnings: this.dataModel.warnings || [],
          isPending: false,
        }
      },
      updateJob(jobObject = {}) {
        const normalizedJob = this.normalizeJob(jobObject)
        const controlValue = normalizedJob
        this.jobControl.setValue(controlValue)
        this.workflow?.getPlugin(SVGJobFileDropPlugin)?.updateToJobState(controlValue)
        // If we modified the job, push the update back
        if (JSON.stringify(normalizedJob) !== JSON.stringify(jobObject)) {
          // this.metaManager.patchAppMeta('job', normalizedJob)
        }
      },
      normalizeJob(jobObject) {
        const nullJob = JobHelper.getNullJobInputs(this.workflow.model)
        const job = jobObject || {}
        for (const key in job) {
          // eslint-disable-next-line no-prototype-builtins
          if (!nullJob.hasOwnProperty(key)) {
            delete job[key]
          }
        }
        return { ...nullJob, ...job }
      },
    },
  }
</script>
