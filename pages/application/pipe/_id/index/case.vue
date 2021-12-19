<template>
  <layout-box class="py-10">
    <div slot="header" class="el-row--flex is-justify-space-between">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" size="small" :model="query" @submit.native.prevent="">
          <el-form-item> <el-input v-model="query.name"></el-input></el-form-item>
        </el-form>
      </div>
      <div class="action-box"></div>
    </div>
    <el-table ref="multipleTable" :data="tableData" class="w-100">
      <el-table-column label="案例名称" prop="name" sortable> </el-table-column>
    </el-table>
  </layout-box>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import CanCreate from '@/components/common/CanCreate.vue'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: { CanCreate, LoadingButton, LayoutBox, GraphIndex },
})
export default class CaseListIndex extends PipeItemMixin {
  query = {
    name: '',
  }
  tableData = []
}
</script>
