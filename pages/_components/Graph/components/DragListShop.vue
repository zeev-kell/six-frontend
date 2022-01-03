<template>
  <div v-loading="loading" class="drag-list-shop">
    <div class="task-search">
      <el-form @submit.native.prevent>
        <el-form-item class="mb-0">
          <el-input
            v-model="listQuery.name"
            size="mini"
            :placeholder="$t('placeholder.search')"
            clearable
            @keyup.enter.native="searchQuery"
            @clear="searchQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchQuery"></el-button>
          </el-input>
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
import TableMixins from '@/components/TableMixinsDeprecated'
import { tableQuery } from '@/types/response'
import { PipeModel } from '@/types/model/Pipe'
import DragItemCollapse from '@/pages/_components/Graph/components/DragItemCollapse.vue'

@Component({
  components: {
    DragItemCollapse,
  },
})
export default class DragListShop extends TableMixins<PipeModel> {
  protected listQuery: any = {
    name: undefined,
  }
  protected listQueryKeys: string[] = ['name']
  protected filterPipe(p: PipeModel): boolean {
    return (p.type === 0 || p.type === 1) && !!p.resource_id
  }

  async refreshTable(): Promise<void> {
    this.loading = true
    const term = this.listQuery.name ? `name:${this.listQuery.name}` : ''
    let response = await this.$api.pipe.getList({ term })
    response = response.filter(this.filterPipe)
    response.forEach((p: PipeModel) => {
      if (p.versions?.length === 1) {
        p.versions = []
      }
    })
    this.tableData = response
    this.loading = false
  }
}
</script>
