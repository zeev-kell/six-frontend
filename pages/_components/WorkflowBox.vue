<template>
  <div class="workflow-box">
    <workflow-cwl ref="cwl"></workflow-cwl>
    <workflow-tool :workflow="workflow"></workflow-tool>
  </div>
</template>

<script type="text/babel">
  import WorkflowCwl from '@/pages/_components/WorkflowCwl'
  import WorkflowTool from '@/pages/_components/WorkflowTool'
  export default {
    name: 'WorkflowBox',
    components: { WorkflowTool, WorkflowCwl },
    computed: {
      workflow() {
        return this.$refs.cwl.workflow
      },
    },
  }
</script>

<style lang="scss" scoped></style>
