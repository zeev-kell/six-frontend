<template>
  <div class="container-fluid">
    <div class="el-row el-row--flex is-align-middle p-20 info-header">
      <div class="el-col-auto px-20">
        <i class="el-icon-reading" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 v-truncate="item['name']" class="my-0"></h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | caseTypeTranslate | t({ prefix: 'constant.' }) }}</div>
          </div>
          <div class="el-col">
            <div class="title">版本</div>
            <div>{{ content.version }}</div>
          </div>
          <div class="el-col">
            <div class="title">最近更新</div>
            <div>{{ item.updated_at }}</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8 text-right">
        <toggle-edit-info type="warning" icon="el-icon-back"> 详情 </toggle-edit-info>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-case-id-edit" />
      <el-tab-pane label="工作结构" name="application-case-id-edit-work" />
      <el-tab-pane label="使用教程" name="application-case-id-edit-course" />
      <el-tab-pane label="管理" name="application-case-id-edit-setting" />
    </el-tabs>
    <div class="px-20 mt-5 pb-10 no-gutters">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { getObject, stringifyObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { downloadStrLink } from '@/utils/download-link'
import CanCreate from '@/components/common/CanCreate.vue'
import CanExamine from '@/components/common/CanExamine.vue'
import ToggleEditInfo from '@/pages/application/_components/ToggleEditInfo.vue'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import CaseMixin from '@/pages/application/case/_components/CaseMixin.vue'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'

@Component({
  components: { LayoutBox, ToggleEditInfo, CanExamine, CanCreate },
})
export default class CaseIdEditIndex extends mixins<CaseItemMixin>(CaseMixin) {
  handleDownload(format = 'yaml'): void {
    const asYaml = format === 'yaml'
    const data = stringifyObject(getObject(this.item.content), asYaml)
    const name = this.item.name + `.${asYaml ? 'cwl' : format}`
    downloadStrLink(data, name)
  }
  handleDelete(): Promise<any> {
    return this.$confirm('此操作将永久删除该案例, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      return this.$api.case.remove(this.$route.params.id).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.$I18nRouter.push('/application/cases')
      })
    })
  }
}
</script>
