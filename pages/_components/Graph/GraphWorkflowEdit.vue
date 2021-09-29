<template>
  <div class="graph h-100 el-row el-row--flex">
    <drag-list-box class="el-col-auto" @tool-event="toolEvent" />
    <div class="el-col-full p-r">
      <graph-index ref="graphIndex" class="h-100v" :item="item" tools="empty|download|plus,minus,fit|auto" @propagate-event="onPropagate" />
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
import { getStore } from '@/utils/local-storage'
import { GraphEvent } from '@/constants/GraphEvent'

@Component({
  components: { ValidationReport, DragListBox, GraphIndex },
})
export default class GraphWorkflowEdit extends Vue {
  $refs!: {
    graphIndex: GraphIndex
  }

  item: any = {
    content: null,
    type: pipeConstants.items.TYPE_APP,
  }
  timeout: any = null

  toolEvent(eventName: string, ...args: any[]): void {
    this.$refs.graphIndex.dispatchAction(eventName, ...args)
  }
  saveContent() {
    this.timeout = setTimeout(() => {
      const isSave = this.$refs.graphIndex.dispatchAction(GraphEvent.TriggerGraphSaveContent)
      if (isSave) {
        this.$notify({
          title: '',
          duration: 2000,
          customClass: 'el-notification-graph',
          message: '自动保存成功',
          offset: 40,
        })
      }
      this.saveContent()
    }, 32 * 1000)
  }
  onPropagate(eventName: string): void {
    // TODO 修改为事件
    // 监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      this.saveContent()
    }
  }

  mounted(): void {
    const content = getStore('graph-content', true)
    this.item.content = content ?? Generator.generateWorkflow()
  }
  beforeDestroy(): void {
    clearTimeout(this.timeout)
  }
}
</script>
