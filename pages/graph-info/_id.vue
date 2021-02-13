<template>
  <div class="h-100v">
    <workflow-graph
      ref="cwl"
      :cwl="item.cwl_json"
      :readonly="false"
      @workflow-changed="onWorkflowChanged"
    ></workflow-graph>
  </div>
</template>

<script type="text/babel">
  import WorkflowGraph from '@/pages/application/_components/WorkflowGraph'
  export default {
    name: 'GraphInfo',
    components: { WorkflowGraph },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/workflow/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
        workflow: null,
      }
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
