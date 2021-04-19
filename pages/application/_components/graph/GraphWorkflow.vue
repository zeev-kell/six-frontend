<script type="text/babel">
  import { Workflow } from 'cwl-svg'
  import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
  import CwlGraphMixin from '@/pages/application/_components/graph/CwlGraphMixin'

  export default {
    name: 'GraphWorkflow',
    mixins: [CwlGraphMixin],
    methods: {
      createModel(json) {
        this.dataModel = WorkflowFactory.from(json)
        const plugins = this.defaultPlugins
        this.workflow = new Workflow({
          editingEnabled: !this.readonly,
          model: this.dataModel,
          svgRoot: this.$refs.svg,
          plugins,
        })
      },
    },
  }
</script>
