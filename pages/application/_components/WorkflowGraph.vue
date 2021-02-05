<template>
  <div class="workflow-graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" oncontextmenu="return false"></svg>
      <div class="workflow-tool">
        <el-button type="dark" size="mini" icon="el-icon-magic-stick" title="自动排版" @click="autoLayout"></el-button>
        <el-button type="dark" size="mini" icon="el-icon-magic-stick" title="自动排版" @click="autoLayout"></el-button>
      </div>
    </div>
    <workflow-panel ref="panel" :workflow="workflow"></workflow-panel>
  </div>
</template>

<script type="text/babel">
  import WorkflowPanel from '@/pages/application/_components/WorkflowPanel'
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, Workflow, ZoomPlugin } from 'cwl-svg'
  import 'cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss'
  import 'cwl-svg/src/plugins/port-drag/theme.dark.scss'
  import 'cwl-svg/src/plugins/selection/theme.dark.scss'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import { DblclickPlugin } from './plugins/dblclick-plugin'

  export default {
    components: { WorkflowPanel },
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
      cwl() {
        this.cwlState = this.cwl
      },
      workflow() {
        this.$emit('workflow-changed', this.workflow)
      },
      cwlState() {
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [
          new SVGArrangePlugin(),
          new SVGEdgeHoverPlugin(),
          new SelectionPlugin(),
          new DblclickPlugin(),
          new ZoomPlugin(),
          ...this.plugins,
        ]
        this.workflow = new Workflow({
          editingEnabled: this.editingEnabled,
          model: this.cwlModel,
          svgRoot: this.$refs.svg,
          plugins,
        })

        // 自动放缩 并且 调整排版
        // const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        // if (arranger) arranger.arrange()

        // 自动放缩到窗口大小
        // NOTE 如果这时候宽度高度不存在，会发生异常
        this.workflow.fitToViewport()
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
      this.workflow?.destroy()
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
