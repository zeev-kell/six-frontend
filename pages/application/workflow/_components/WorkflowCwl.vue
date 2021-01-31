<template>
  <div class="cwl-box h-100 p-r">
    <svg ref="svg" class="cwl-workflow h-100" oncontextmenu="return false"></svg>
    <tool-box class="tool-box" :workflow="workflow"></tool-box>
  </div>
</template>

<script>
  import ToolBox from '@/pages/application/workflow/_components/ToolBox'
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, Workflow, ZoomPlugin } from 'cwl-svg'
  import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
  import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
  import 'cwl-svg/src/plugins/selection/theme.dark.scss'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'

  export default {
    components: { ToolBox },
    props: {
      cwlUrl: {
        type: String,
        default: null,
        note: `A URL to request for the initial CWL object from. Used as an alternative to
                the "cwl" prop`,
      },
      cwl: {
        type: Object,
        default: null,
        note: `The JSON object representing the CWL workflow to render`,
      },

      editingEnabled: {
        type: Boolean,
        default: false,
        note: `True if the workflow is editable`,
      },
      plugins: {
        type: Array,
        default: () => [],
        note: `A list of CWL plugins to use in the CWL rendering`,
      },
    },
    data() {
      return {
        selectedNode: null,
        workflow: null,
        cwlState: null,
      }
    },
    computed: {
      cwlModel() {
        return WorkflowFactory.from(this.cwlState)
      },
    },
    watch: {
      /**
       * If the cwl prop ever changes, update the internal workflow object to that
       */
      cwl() {
        this.cwlState = this.cwl
      },

      workflow() {
        this.$emit('workflow-changed', this.workflow)
      },

      cwlState() {
        // 默认可以放缩，选择节点，线条悬浮
        const plugins = [new SVGEdgeHoverPlugin(), new SelectionPlugin(), new ZoomPlugin(), ...this.plugins]
        this.workflow = new Workflow({
          editingEnabled: this.editingEnabled,
          model: this.cwlModel,
          svgRoot: this.$refs.svg,
          plugins,
        })

        // Hack to force ArrangePlugin to rearrange
        const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        if (arranger) arranger.arrange()

        // Emit a selectionChanged event when selection changes
        const selection = this.workflow.getPlugin(SelectionPlugin)
        if (selection) {
          selection.registerOnSelectionChange((element) => {
            if (element) {
              const id = element.getAttribute('data-connection-id')
              const selected = this.workflow.model.findById(id)
              this.$emit('selection-changed', selected)
            }
          })
        }
      },
    },
    /**
     * If the cwlUrl prop was set, send a request for the CWL object, and set it to the internal
     * state
     */
    mounted() {
      if (this.cwlUrl) {
        fetch(this.cwlUrl, {
          headers: new Headers({
            Accept: 'application/json',
          }),
        })
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            this.cwlState = json
          })
      }
      this.$refs.svg.addEventListener(
        'wheel',
        (event) => {
          event.preventDefault()
        },
        true
      )
    },
  }
</script>

<style lang="css">
  .tool-box {
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 10;
    color: white;
    display: none;
  }
  .cwl-box:hover .tool-box {
    display: block;
  }
</style>
