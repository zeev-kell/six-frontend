<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { CommandLineToolFactory, CommandLineToolModel, WorkflowModel } from 'cwlts/models'
import GraphMixin from '@/pages/_components/Graph/GraphMixin.vue'
import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'
import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
import { isType } from 'cwlts/models/helpers/utils'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import { Workflow } from 'cwl-svg'

@Component({
  data() {
    return {
      workflowWrapper: null,
    }
  },
})
export default class GraphTool extends GraphMixin {
  dataModel!: CommandLineToolModel
  workflowWrapper!: WorkflowModel

  recreateModel(json: CommandLineTool): void {
    this.dataModel = CommandLineToolFactory.from(json, 'document')
    if (!this.dataModel.namespaces.has('sbg')) {
      this.dataModel.namespaces.set('sbg', 'https://www.sevenbridges.com/')
    }
    this.dataModel.updateCommandLine()
    this.dataModel.setValidationCallback(this.afterModelValidation.bind(this))
    this.dataModel.validate().then(this.afterModelValidation.bind(this))

    this.workflowWrapper = WorkflowFactory.from({ cwlVersion: this.dataModel.cwlVersion } as V1Workflow)
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
    this.dataModel.setJobInputs(undefined)
  }
  createModel(json: CommandLineTool): void {
    this.recreateModel(json)
    this.afterModelCreated()
    const plugins = this.getDefaultPlugins()
    this.graph = new Workflow({
      editingEnabled: !this.readonly,
      model: this.workflowWrapper,
      svgRoot: this.$refs.svg,
      plugins,
    })
  }
}
</script>
