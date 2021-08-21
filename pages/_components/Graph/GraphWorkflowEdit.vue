<template>
  <div class="h-100 el-row el-row--flex">
    <drag-list-box class="el-col-auto" @tool-event="toolEvent" />
    <div class="el-col-full p-r">
      <graph-index ref="graphIndex" class="h-100v" :item="item" tools="download|plus,minus,fit|auto" />
      <validation-report />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Generator } from '@/pages/_components/Graph/Generator'
import { pipeConstants } from '@/constants/PipeConstants'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import DragListBox from '@/pages/_components/Graph/components/DragListBox.vue'
import ValidationReport from '@/pages/_components/Graph/components/ValidationReport.vue'

@Component({
  components: { ValidationReport, DragListBox, GraphIndex },
})
export default class GraphWorkflowEdit extends Vue {
  $refs!: {
    graphIndex: GraphIndex
  }

  item = {
    content: Generator.generateWorkflow(),
    type: pipeConstants.items.TYPE_APP,
  }

  toolEvent(eventName: string, ...args: any[]): void {
    this.$refs.graphIndex.dispatchAction(eventName, ...args)
  }
}
</script>
