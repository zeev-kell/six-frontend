import { Component, Vue } from 'nuxt-property-decorator'
import { AppValidityState } from '@/pages/_components/Graph/types'
import { CommandLineToolModel, WorkflowModel } from 'cwlts/models'
import { Workflow, CommandLineTool } from 'cwlts/mappings/v1.0'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import { FormControl } from '@/pages/application/_components/FormControl'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'

@Component({
  data() {
    return {
      dataModel: null,
      validationState: {
        isValidCWL: false,
        isPending: true,
        errors: [],
        warnings: [],
      },
    }
  },
})
export class GraphEdit extends Vue {
  dataModel!: CommandLineToolModel | WorkflowModel
  validationState!: AppValidityState
  jobControl = new FormControl({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recreateModel(json: string | CommandLineTool | V1Workflow): void {
    throw new Error('Method not implemented.')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterModelCreated(isFirstCreation: boolean): void {
    throw new Error('Method not implemented.')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createModel(json: CommandLineTool | Workflow | null | 'null'): void {
    throw new Error('Method not implemented.')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCommandLineResult(...args: any[]): void {
    console.log('onCommandLineResult', args)
  }
  afterModelValidation(): void {
    console.log('afterModelValidation')
    this.validationState = {
      ...this.validationState,
      errors: this.dataModel.errors || [],
      warnings: this.dataModel.warnings || [],
      isPending: false,
    }
  }
  validate(): void {
    // TODO 增加
    const { errors } = this.validationState
    if (errors.length > 0) {
      this.$$message.error('graph.error.has_issues')
      throw new Error(JSON.stringify(errors))
    }
  }
}
