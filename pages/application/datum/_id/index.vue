<template>
  <div class="container-fluid py-10">
    <div class="el-row el-row--flex is-align-middle info-header">
      <div class="el-col-auto px-20">
        <i v-if="isFormat" class="el-icon-notebook-1" style="font-size: 36px" />
        <i v-else-if="isData" class="el-icon-document" style="font-size: 36px" />
        <i v-else-if="isDataPackage" class="el-icon-files" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 v-truncate="item['name']" class="my-0"></h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | datumTypeTranslate | t({ prefix: 'constant.' }) }}</div>
          </div>
          <div class="el-col">
            <div class="title">版本</div>
            <div>{{ item.version }}</div>
          </div>
          <div class="el-col">
            <div class="title">最近更新</div>
            <div>{{ item.updated_at }}</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8 text-right">
        <can-create :is-user="item.provider">
          <toggle-edit-info type="primary" icon="el-icon-edit"> 编辑 </toggle-edit-info>
        </can-create>
        <can-create :is-user="item.provider">
          <loading-button type="danger" icon="el-icon-delete" :callback="handleDelete"> 删除 </loading-button>
        </can-create>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-datum-id-index" />
      <el-tab-pane v-if="isFormat" label="格式规范" name="application-datum-id-index-format" />
      <el-tab-pane v-if="isFormat" label="历史版本" name="application-datum-id-index-version" />
      <el-tab-pane v-if="!isFormat" label="数据结构" name="application-datum-id-index-structure" />
      <el-tab-pane v-if="!isFormat" label="文件" name="application-datum-id-index-file" />
      <el-tab-pane v-if="!isFormat" label="处理流程" name="application-datum-id-index-process" />
    </el-tabs>
    <div class="px-20 mt-5 pb-10 no-gutters">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import CanCreate from '@/components/common/CanCreate.vue'
import CanExamine from '@/components/common/CanExamine.vue'
import ToggleEditInfo from '@/pages/application/_components/ToggleEditInfo.vue'
import DatumMixin from '@/pages/application/datum/_components/DatumMixin.vue'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton, ToggleEditInfo, CanExamine, CanCreate },
})
export default class DatumIdIndex extends mixins<DatumMixin>(DatumMixin) {
  handleDelete(): Promise<any> {
    return this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      return this.$api.datum.remove(this.$route.params.id).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.$I18nRouter.push('/application/data')
      })
    })
  }
}
</script>
