import { DblclickPlugin } from '@/pages/application/_components/cwl-graph/plugins/dblclick-plugin'
import { Workflow } from 'cwl-svg'

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
}
