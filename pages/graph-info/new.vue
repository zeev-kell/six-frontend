<template>
  <div class="h-100 el-row el-row--flex">
    <drag-list-box class="el-col-auto"></drag-list-box>
    <div class="el-col-full">
      <graph-index ref="graphIndex" class="h-100v" :item="item" tools="run|download|plus,minus,fit|auto" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { Generator } from '@/pages/_components/Graph/Generator'
import { pipeConstants } from '@/constants/PipeConstants'
import DragListBox from '@/pages/_components/Graph/components/DragListBox.vue'

@Component({
  components: { DragListBox, GraphIndex },
  asyncData() {
    const content = Generator.generateWorkflow()
    return {
      item: {
        content,
        type: pipeConstants.items.TYPE_APP,
      },
    }
  },
})
export default class GraphInfoNew extends Vue {
  item = null
}
</script>
