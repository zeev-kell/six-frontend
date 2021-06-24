<script type="text/babel">
import { Workflow } from 'cwl-svg'
import { WorkflowFactory } from 'cwlts/models/generic/WorkflowFactory'
import GraphMixin from '@/pages/application/_components/graph/GraphMixin'

export default {
  name: 'GraphWorkflow',
  mixins: [GraphMixin],
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
