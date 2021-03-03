<script type="text/babel">
  import { SVGArrangePlugin, Workflow } from 'cwl-svg'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import cwlMixin from '@/pages/application/_components/cwl-graph/CwlMixin'

  export default {
    name: 'WorkflowGraph',
    mixins: [cwlMixin],
    watch: {
      cwlState(json) {
        this.dataModel = WorkflowFactory.from(json)
        // 默认可以放缩，选择节点，线条悬浮，自动放缩
        const plugins = [...this.getDefaultPlugins(), ...this.plugins]
        this.workflow = new Workflow({
          editingEnabled: !this.readonly,
          model: this.dataModel,
          svgRoot: this.$refs.svg,
          plugins,
        })
        // 自动放缩 并且 调整排版
        const arranger = this.workflow.getPlugin(SVGArrangePlugin)
        if (arranger) arranger.arrange()
      },
    },
  }
</script>
