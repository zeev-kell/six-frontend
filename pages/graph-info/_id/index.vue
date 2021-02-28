<template>
  <div class="h-100v">
    <tool-graph v-if="isTool" ref="cwl" :cwl="item.cwl" :readonly="true" @workflow-changed="onWorkflowChanged" />
    <workflow-graph v-else ref="cwl" :cwl="item.cwl" :readonly="true" @workflow-changed="onWorkflowChanged" />
  </div>
</template>

<script type="text/babel">
  import PipeConstants from '@/constants/PipeConstants'
  import ToolGraph from '@/pages/application/_components/tool/ToolGraph'
  import WorkflowGraph from '@/pages/application/_components/workflow/WorkflowGraph'
  export default {
    name: 'GraphInfo',
    components: {
      ToolGraph,
      WorkflowGraph,
    },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/pipe/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
        workflow: null,
      }
    },
    computed: {
      isTool() {
        return this.item?.type ? this.item?.type === PipeConstants.Constants.TYPE_TOOL : true
      },
    },
    mounted() {
      // const onResize = () => {
      //   this.workflow.fitToViewport()
      // }
      // window.addEventListener('resize', onResize)
      // this.$once('hook:beforeDestroy', function () {
      //   window.removeEventListener('resize', onResize)
      // })
    },
    methods: {
      onWorkflowChanged(workflow) {
        this.workflow = workflow
      },
    },
  }
</script>
