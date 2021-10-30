import { Component, Vue } from 'nuxt-property-decorator'
import { AppValidityState } from '@/types/graph'
import { CommandLineToolModel, StepModel, WorkflowInputParameterModel, WorkflowModel, WorkflowOutputParameterModel } from 'cwlts/models'
import { Workflow, CommandLineTool } from 'cwlts/mappings/v1.0'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import { GraphEvent } from '@/constants/GraphEvent'

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
  isFirstCreation = true

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recreateModel(json: string | CommandLineTool | V1Workflow): void {
    throw new Error('Method not implemented.')
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterModelCreated(): void {
    if (this.isFirstCreation) {
      // 只有第一次触发创建
      this.isFirstCreation = false
      this.propagateEvent(GraphEvent.TriggerPageModalCreate)
    }
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
    this.validationState = {
      ...this.validationState,
      errors: this.dataModel.errors || [],
      warnings: this.dataModel.warnings || [],
      isPending: false,
    }
    this.$store.commit('graph/SET_VALIDATION_STATE', this.validationState)
  }
  // 事件转发到父组件
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propagateEvent(...args: any[]): void {
    this.$emit(GraphEvent.Propagate, ...args)
  }
  // 流程校验
  // eslint-disable-next-line require-await
  async validate(): Promise<void> {
    const { errors } = this.validationState
    // 必须处理的异常，目前还不知道什么会在 errors 里面，没有做好提示处理
    if (errors.length > 0) {
      this.$$message.error('graph.error.has_issues')
      throw new Error(JSON.stringify(errors))
    }
    const { outputs = [], steps = [], inputs = [] } = this.dataModel as WorkflowModel
    // 至少需要一个输出
    if (outputs.length === 0) {
      throw new Error(this.$t('graph.at_least_one_output') as string)
    }
    const customerError: any[] = []
    const checkSource = function (source: string[], msg: string) {
      if (source.length === 0) {
        customerError.push(msg)
      }
    }
    const checkError = function () {
      if (customerError.length) {
        throw customerError
      }
    }
    // 保存所有的输入节点，用来判断是否有多余的 Input
    const sourceIn: string[] = []
    // 判断多余的 Output
    outputs.forEach((o: WorkflowOutputParameterModel) => {
      checkSource(o.source, o.id)
    })
    checkError()
    // 判断没有必须的输入节点 TODO 重复的节点ID ?
    steps.forEach((step: StepModel) => {
      step.in.forEach((i) => {
        const { source, isVisible } = i
        const { isNullable, type } = i.type
        sourceIn.push(...source)
        // 必填 && (文件类型 ||  显示节点的其他类型)
        if (!isNullable && (type === 'File' || isVisible)) {
          checkSource(source, i.id)
        }
      })
      // NOTE 是否需要判断必须的输出
    })
    checkError()
    // 判断多余的 Input
    inputs.forEach((i: WorkflowInputParameterModel) => {
      if (!sourceIn.includes(i.id)) {
        customerError.push(i.id)
      }
    })
    checkError()
  }
}
