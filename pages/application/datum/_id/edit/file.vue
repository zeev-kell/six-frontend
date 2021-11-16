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
        <el-button
          :disabled="!canUpload"
          :title="canUpload ? '新增' : '数据只能有一个文件'"
          type="primary"
          icon="el-icon-plus"
          @click="showFileUploadDialog"
        >
          新增
        </el-button>
        <el-button type="danger" :disabled="!hasSelected" icon="el-icon-delete" @click="onDeleteSelect"> 删 除 </el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="文件名称" prop="name" sortable width="250"></el-table-column>
        <el-table-column label="媒介类型" prop="mediatype" sortable width="120"></el-table-column>
        <el-table-column label="大小" prop="bytes" sortable width="80">
          <template slot-scope="{ row }">
            <div>{{ row.bytes | formatbytes }}</div>
          </template>
        </el-table-column>
        <el-table-column label="MD5校验码" prop="hash" width="230">
          <template slot-scope="{ row }">
            <div v-clipboard="row.hash" class="text-truncate">{{ row.hash }}</div>
          </template>
        </el-table-column>
        <el-table-column label="格式规范" width="120">
          <template slot-scope="{ row }">
            <schema-name :schema="row.schema"></schema-name>
          </template>
        </el-table-column>
        <el-table-column label="说明" prop="description">
          <template slot-scope="{ row }">{{ row.description | intercept }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="icon" size="mini" icon="el-icon-edit" title="编辑"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <file-upload-dialog ref="FileUploadDialog" :is-multiple="isMultiple" @change="refresh"></file-upload-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'
import intercept from '@/filters/intercept'
import clipboard from '@/directives/clipboard'
import FileUploadDialog from '@/pages/application/datum/_components/FileUploadDialog.vue'
import formatbytes from '@/filters/formatbytes'
import SchemaName from '@/pages/application/datum/_components/SchemaName.vue'
import { ElTable } from 'element-ui/types/table'

@Component({
  directives: {
    ...clipboard,
  },
  asyncData({ store }) {
    const items = store.getters['datum/items']
    return { items }
  },
  filters: {
    ...intercept,
    ...formatbytes,
  },
  components: {
    SchemaName,
    FileUploadDialog,
  },
})
export default class DatumEditFile extends BaseTable {
  $refs!: {
    FileUploadDialog: FileUploadDialog
    multipleTable: ElTable
  }
  get isMultiple(): boolean {
    return this.$store.getters['datum/isDataPackage']
  }
  get canUpload(): boolean {
    // 数据包 或者 没有文件
    return this.isMultiple || this.items.length === 0
  }
  async refresh() {
    await this.$store.dispatch('datum/refresh', this.$route.params.id)
    this.items = this.$store.getters['datum/items']
  }
  showFileUploadDialog(): void {
    this.$refs.FileUploadDialog.onShowDialog()
  }
  onDeleteSelect(): void {
    this.$confirm('此操作将永久删除选择的文件, 是否继续?', '提示', {
      type: 'warning',
    }).then(async () => {
      await this.$api.datum.deleteFile(
        this.$route.params.id,
        this.multipleSelection.map((s: any) => s.id)
      )
      await this.refresh()
    })
  }
}
</script>
