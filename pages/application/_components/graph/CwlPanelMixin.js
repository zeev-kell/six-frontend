import { DblclickPlugin } from '@/pages/application/_components/graph/plugins/dblclick-plugin'
import { Workflow } from 'cwl-svg'
import { StepModel } from 'cwlts/models/generic/StepModel'
import { WorkflowInputParameterModel } from 'cwlts/models/generic/WorkflowInputParameterModel'

export default {
  props: {
    workflow: {
      type: Workflow,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    pipeId: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      showPanel: false,
      // inspectedNode
      selectionNode: undefined,
      activeTabName: undefined,
    }
  },
  watch: {
    workflow() {
      const selection = this.workflow?.getPlugin(DblclickPlugin)
      if (selection) {
        selection.registerOnDblClick(this.onDblClick)
      }
    },
  },
  computed: {
    typeOfSelectionNode() {
      if (this.selectionNode instanceof StepModel) {
        return 'Step'
      } else if (this.selectionNode instanceof WorkflowInputParameterModel) {
        return 'Input'
      } else {
        return 'Output'
      }
    },
    labelName() {
      return this.selectionNode.label || this.selectionNode.id || this.selectionNode.loc || this.typeOfSelectionNode
    },
  },
}
