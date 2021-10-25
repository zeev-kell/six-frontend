<template>
  <div class="container-fluid p-20">
    <div class="el-row--flex is-justify-space-between pb-10">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" :model="query" @submit.native.prevent="">
          <el-form-item>
            <el-autocomplete v-model="query.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
              <template slot-scope="{ item }">
                <div class="name">
                  {{ item.value }}
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true"> 新增 </el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableDate" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="文件名称" prop="name" sortable width="280"></el-table-column>
        <el-table-column label="媒介类型" prop="format" sortable width="120"></el-table-column>
        <el-table-column label="大小" prop="category" sortable width="120" />
        <el-table-column label="MD5校验码" prop="version" width="120" />
        <el-table-column label="格式规范" prop="version" width="120" />
        <el-table-column label="说明" prop="description">
          <template slot-scope="{ row }">{{ row.description | intercept }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button>下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-upload-dialog></el-upload-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'
import intercept from '@/filters/intercept'
import ElUploadDialog from '../../_components/ElUploadDialog.vue'

@Component({
  asyncData({ store }) {
    const items = store.getters['datum/items']
    return { items }
  },
  filters: {
    ...intercept,
  },
  components: {
    ElUploadDialog,
  },
})
export default class DatumEditManage extends BaseTable {}
</script>
