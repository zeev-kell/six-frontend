<template>
  <div class="tool-list-box">
    <div class="tool-list">
      <el-button type="dark" icon="el-icon-s-unfold" size="mini" @click.prevent="onShowPanel"></el-button>
    </div>
    <transition name="el-zoom-in-left">
      <div v-if="showPanel" class="left-panel">
        <ul class="list-unstyled">
          <drag-item v-for="item of tableData" :key="item.id" :item="item">
            {{ item.name }}
          </drag-item>
        </ul>
      </div>
    </transition>
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
  showPanel = false
  isShowed = false
  tableData: any[] = []

  onShowPanel(): void {
    if (this.showPanel) {
      this.showPanel = false
      return
    }
    if (!this.isShowed) {
      this.isShowed = true
      this.searchQuery()
    }
    this.showPanel = true
  }

  async getTableData(listQuery: tableQuery): Promise<void> {
    let response = await this.$api.pipe.getList()
    response = response.filter((r: any) => r.type === 0 || r.type === 1)
    response.forEach((r: any) => {
      r.content = cwl
    })
    this.tableData = response
  }

  async created(): Promise<void> {}
}
</script>

<style lang="scss">
.tool-list-box {
  position: relative;
  .tool-list {
    position: absolute;
    right: -60px;
    top: 10px;
    z-index: 10;
    color: white;
  }
  .el-button--mini {
    width: 30px;
    height: 30px;
    padding: 0;
  }
}
</style>
