import { WorkflowOutputParameterModel, WorkflowInputParameterModel, StepModel } from 'cwlts/models'
import { Component, Vue, Watch, InjectReactive, Prop } from 'nuxt-property-decorator'
import { Workflow } from 'cwl-svg'
import { SVG_TYPE } from '@/pages/_components/Graph/plugins/plugin-help'
import { DblclickPlugin_ } from '@/pages/_components/Graph/plugins/dblclick-plugin_'

@Component({
  data() {
    return {
      selectionNode: undefined,
      activeTabName: undefined,
    }
  },
})
export default class InspectorMixins extends Vue {
  @InjectReactive('graph')
  graph!: Workflow

  @Prop({ default: false })
  readonly!: boolean
  showPanel = false
  selectionNode!: StepModel | WorkflowInputParameterModel | WorkflowOutputParameterModel
  activeTabName: string | undefined

  @Watch('graph')
  onWatchWorkflow(): void {
    const selection = this.graph?.getPlugin(DblclickPlugin_)
    if (selection) {
      selection.registerOnDblClick(this.onDblClick, this.onDblClickType)
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

  onDblClickType: SVG_TYPE | undefined = undefined
  onDblClick(element: string | SVGElement): void {
    throw new Error('Method not implemented.')
  }
}
