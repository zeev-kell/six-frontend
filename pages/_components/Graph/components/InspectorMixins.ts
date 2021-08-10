import { DblclickPlugin } from '@/pages/application/_components/graph/plugins/dblclick-plugin'
import { StepModel } from 'cwlts/models/generic/StepModel'
import { WorkflowInputParameterModel } from 'cwlts/models/generic/WorkflowInputParameterModel'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { InjectReactive, Prop } from 'vue-property-decorator'
import { Workflow } from 'cwl-svg'

@Component({
  data() {
    return {
      selectionNode: undefined,
    }
  },
})
export default class InspectorMixins extends Vue {
  @Prop({ default: false })
  readonly!: boolean
  @Prop()
  pipeId: string = ''
  @InjectReactive('graph')
  private graph!: Workflow
  showPanel = false
  selectionNode!: StepModel | WorkflowInputParameterModel
  activeTabName = undefined

  @Watch('workflow')
  onWatchWorkflow(): void {
    const selection = this.graph?.getPlugin(DblclickPlugin)
    if (selection) {
      selection.registerOnDblClick(this.onDblClick)
    }
  }

  get typeOfSelectionNode(): string {
    if (this.selectionNode instanceof StepModel) {
      return 'Step'
    } else if (this.selectionNode instanceof WorkflowInputParameterModel) {
      return 'Input'
    } else {
      return 'Output'
    }
  }
  get labelName(): string {
    return this.selectionNode.label || this.selectionNode.id || this.selectionNode.loc || this.typeOfSelectionNode
  }
  get isStep(): boolean {
    return this.selectionNode instanceof StepModel
  }

  onDblClick(element: string | null): void {
    throw new Error('Method not implemented.')
  }
}
