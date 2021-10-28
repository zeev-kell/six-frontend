<template>
  <div class="datum-container">
    <div class="el-row el-row--flex is-align-middle info-header">
      <div class="el-col-auto px-20">
        <i v-if="isFormat" class="el-icon-notebook-1" style="font-size: 36px" />
        <i v-else-if="isData" class="el-icon-document" style="font-size: 36px" />
        <i v-else-if="isDataPackage" class="el-icon-files" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 class="text-truncate my-0" :title="item['name']">
          {{ item['name'] }}
        </h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | datumTypeTranslate | t }}</div>
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
        <el-button type="primary" icon="el-icon-caret-right"> 校验数据 </el-button>
        <el-button type="info" icon="el-icon-download"> 下载 </el-button>
        <can-create v-if="item.provider === username">
          <toggle-edit-info type="primary" icon="el-icon-edit"> 编辑 </toggle-edit-info>
        </can-create>
        <can-examine>
          <el-button type="danger" icon="el-icon-delete" @click="handleDeleteDatum"> 删除 </el-button>
        </can-examine>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-datum-id-index" />
      <el-tab-pane v-if="isFormat" label="格式规范" name="application-datum-id-index-format" />
      <el-tab-pane v-if="isFormat" label="历史版本" name="application-datum-id-index-version" />
      <el-tab-pane v-if="!isFormat" label="数据结构" name="application-datum-id-index-structure" />
      <el-tab-pane v-if="!isFormat" label="数据下载" name="application-datum-id-index-manage" />
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

@Component({
  components: { ToggleEditInfo, CanExamine, CanCreate },
})
export default class DatumIdIndex extends mixins<DatumMixin>(DatumMixin) {
  handleDeleteDatum() {
    this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        return this.$$axios.delete('/v2/datum/' + this.$route.params.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.$I18nRouter.push('/application/datums')
        })
      })
      .catch(() => {})
  }
}
</script>
