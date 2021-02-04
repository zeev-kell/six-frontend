<template>
  <div class="workflow-box h-100">
    <svg ref="svg" class="cwl-workflow h-100" oncontextmenu="return false"></svg>
    <div class="workflow-tool">
      <el-button type="dark" size="mini" icon="el-icon-magic-stick" title="自动排版" @click="autoLayout"></el-button>
    </div>
  </div>
</template>

<script type="text/babel">
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, Workflow, ZoomPlugin } from 'cwl-svg'
  import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
  import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
  import 'cwl-svg/src/plugins/selection/theme.dark.scss'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  export default {
    props: {
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
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [
          new SVGEdgeHoverPlugin(),
          new SelectionPlugin(),
          new ZoomPlugin(),
          new SVGArrangePlugin(),
          ...this.plugins,
        ]
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
    mounted() {
      // FIX 第一次没有监听到变化
      if (this.cwl && this.cwlState === null) {
        this.cwlState = this.cwl
      }
      // FIX 鼠标滚动事件捕抓
      this.$refs.svg.addEventListener(
        'wheel',
        (event) => {
          event.preventDefault()
        },
        true
      )
    },
    beforeDestroy() {
      // 销毁流程图
      this.workflow.destroy()
    },
    methods: {
      /**
       * 自动排版
       */
      autoLayout() {
        // 第一次调用居中，第二次调用重新排列
        this.workflow.getPlugin(SVGArrangePlugin).arrange()
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  .workflow-tool {
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 10;
    color: white;
  }
  .el-button--mini {
    padding: 8px;
  }
</style>
