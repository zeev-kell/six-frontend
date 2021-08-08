<template>
  <div v-if="showPanel" class="cwl-params-panel left-panel">
    <ul class="list-unstyled">
      <drag-item v-for="item of tableData" :key="item.id" :item="item">
        {{ item.name }}
      </drag-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import TableMixins from '@/components/TableMixins'
import { tableQuery } from '@/types/table'
import { taskConstants } from '@/constants/TaskConstants'
import CollapseItem from '@/components/CollapseItem.vue'
import cwl from '@/plugins/mock/cwl.json'
import DragItem from './DragItem.vue'

@Component({
  components: {
    CollapseItem,
    DragItem,
  },
})
export default class TaskBox extends TableMixins<any> {
  protected listQuery: tableQuery = {
    page: 1,
    size: 20,
    name: undefined,
    status: taskConstants.items.STATUS_ON,
  }
  showPanel = true
  tableData: any[] = []

  async getTableData(listQuery: tableQuery): Promise<void> {
    let response = await this.$api.pipe.getList()
    response = response.filter((r: any) => r.type === 0 || r.type === 1)
    response.forEach((r: any) => {
      r.content = cwl
    })
    this.tableData = response
  }
  async created(): Promise<void> {
    let response = await this.$api.pipe.getList()
    response = response.filter((r: any) => r.type === 0 || r.type === 1)
    response.forEach((r: any) => {
      r.content = cwl
    })
    this.tableData = response
  }
}
</script>
<style scoped lang="scss">
.title-b {
  font-weight: 600;
  margin-bottom: 15px;
}
</style>
