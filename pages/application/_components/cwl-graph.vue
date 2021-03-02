<template>
  <div class="cwl-graph">
    <tool-graph v-if="isTool" ref="cwl" :cwl="item.cwl" :readonly="readonly" @workflow-changed="onWorkflowChanged" />
    <workflow-graph v-else ref="cwl" :cwl="item.cwl" :readonly="readonly" @workflow-changed="onWorkflowChanged" />
  </div>
</template>

<script type="text/babel">
  import PipeConstants from '@/constants/PipeConstants'
  import ToolGraph from '@/pages/application/_components/tool/ToolGraph'
  import WorkflowGraph from '@/pages/application/_components/workflow/WorkflowGraph'
  export default {
    name: 'CwlGraph',
    components: {
      ToolGraph,
      WorkflowGraph,
    },
    props: {
      item: {
        type: Object,
        default: null,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        workflow: null,
      }
    },
    computed: {
      isTool() {
        return this.item?.type ? this.item?.type === PipeConstants.Constants.TYPE_TOOL : true
      },
    },
    methods: {
      onWorkflowChanged(workflow) {
        this.workflow = workflow
      },
    },
  }
</script>
