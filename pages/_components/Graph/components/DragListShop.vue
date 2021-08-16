<template>
  <div class="drag-list-shop">
    <div class="task-search">
      <el-form @submit.native.prevent>
        <el-form-item>
          <el-input v-model="listQuery.name" :placeholder="$t('placeholder.search')" clearable @keyup.enter.native="searchQuery"> </el-input>
        </el-form-item>
      </el-form>
    </div>
    <ul class="list-unstyled">
      <drag-item-collapse v-for="item of tableData" :key="item.id" :item="item"></drag-item-collapse>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import TableMixins from '@/components/TableMixins'
import { tableQuery } from '@/types/table'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import DragItemCollapse from '@/pages/_components/Graph/components/DragItemCollapse.vue'
import DragItem from './DragItem.vue'

@Component({
  components: {
    DragItemCollapse,
    DragItem,
  },
})
export default class DragListShop extends TableMixins<PipeModel> {
  protected listQuery: tableQuery = {
    page: 1,
    size: 10000,
    name: undefined,
    status: pipeConstants.items.STATUS_ON,
  }

  protected filterPipe(p: PipeModel): boolean {
    return (p.type === 0 || p.type === 1) && (p.content || p.versions?.length > 0)
  }

  async refreshTable(): Promise<void> {
    let response = await this.$api.pipe.getListV2(this.listQuery)
    response = response.filter(this.filterPipe)
    response.forEach((p: PipeModel) => {
      if (p.versions?.length === 1) {
        p.content = p.versions[0].content
        p.versions = []
      } else if (p.versions?.length > 1) {
        const defaultVersion = p.versions.find((v) => v.resource_id === p.pipe_id)
        if (defaultVersion?.content) {
          p.content = defaultVersion.content
        }
      }
    })
    this.tableData = response
  }
}
</script>
