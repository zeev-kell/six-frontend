<template>
  <div class="h-100 el-row el-row--flex">
    <drag-list-box class="el-col-auto" @tool-event="toolEvent"></drag-list-box>
    <div class="el-col-full p-r">
      <graph-index ref="graphIndex" class="h-100v" :item="item" tools="download|plus,minus,fit|auto" />
      <validation-report></validation-report>
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
export default class GraphInfoNew extends Vue {
  $refs!: {
    graphIndex: GraphIndex
  }

  item = null

  // TODO 修改事件传播方式
  toolEvent(eventName: string, ...args: any[]): void {
    this.$refs.graphIndex.dispatchAction(eventName, ...args)
  }

  created(): void {
    const content = Generator.generateWorkflow()
    this.item = {
      content,
      type: pipeConstants.items.TYPE_APP,
    }
  }
}
</script>
