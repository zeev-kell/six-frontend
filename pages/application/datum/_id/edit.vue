<template>
  <div class="datum-container">
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
        <toggle-edit-info type="warning" icon="el-icon-back"> 详情 </toggle-edit-info>
        <can-examine>
          <el-button type="danger" icon="el-icon-delete" @click="handleDeleteDatum"> 删除 </el-button>
        </can-examine>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-datum-id-edit" />
      <el-tab-pane v-if="isFormat" label="格式规范" name="application-datum-id-edit-format" />
      <el-tab-pane v-if="isFormat" label="历史版本" name="application-datum-id-edit-version" />
      <el-tab-pane v-if="!isFormat" label="数据结构" name="application-datum-id-edit-structure" />
      <el-tab-pane v-if="!isFormat" label="文件" name="application-datum-id-edit-file" />
      <el-tab-pane v-if="!isFormat" label="处理流程" name="application-datum-id-edit-process" />
      <el-tab-pane label="管理" name="application-datum-id-edit-setting" />
    </el-tabs>
    <div class="px-20 mt-5 pb-10 no-gutters">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import CanExamine from '@/components/common/CanExamine.vue'
import ToggleEditInfo from '@/pages/application/_components/ToggleEditInfo.vue'
import DatumMixin from '@/pages/application/datum/_components/DatumMixin.vue'

@Component({
  components: { ToggleEditInfo, CanExamine },
})
export default class DatumIdEdit extends mixins<DatumMixin>(DatumMixin) {
  handleDeleteDatum() {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.$api.datum.removeVersion(this.$route.params.id).then(() => {
        this.$I18nRouter.push('/application/data')
      })
    })
  }
}
</script>
