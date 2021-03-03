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
        selection.registerOnDblClick((element) => {
          if (element && typeof element !== 'string') {
            // 选择了节点 node
            const id = element.getAttribute('data-connection-id')
            const selected = this.workflow.model.findById(id)
            this.showNodeInfo(selected)
          }
        })
      }
    },
  },
  methods: {
    showNodeInfo(selectionNode) {
      if (this.selectionNode?.id !== selectionNode.id) {
        this.selectionNode = selectionNode
        this.activeTabName = 'input'
      }
      this.showPanel = true
    },
  },
}
