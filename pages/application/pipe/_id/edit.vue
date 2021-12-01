<template>
  <div class="pipe-id-container">
    <div class="el-row el-row--flex is-align-middle p-20 info-header">
      <div class="el-col-auto px-20">
        <i v-if="isApp" class="el-icon-s-tools" style="font-size: 36px" />
        <i v-if="isWork" class="el-icon-reading" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 v-truncate="item['name']" class="my-0"></h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | pipeTypeTranslate | t }}</div>
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
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete"> 删除 </el-button>
        </can-examine>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-pipe-id-edit" />
      <el-tab-pane v-if="isWork" label="工作结构" name="application-pipe-id-edit-work" />
      <el-tab-pane v-if="isApp" label="工具结构" name="application-pipe-id-edit-structure" />
      <el-tab-pane label="使用教程" name="application-pipe-id-edit-course" />
      <el-tab-pane v-if="isApp" label="运行案例" name="application-pipe-id-edit-case" />
      <el-tab-pane v-if="isApp" label="历史版本" name="application-pipe-id-edit-version" />
      <el-tab-pane label="管理" name="application-pipe-id-edit-setting" />
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
import PipeMixin from '@/pages/application/pipe/_components/PipeMixin.vue'

@Component({
  components: { ToggleEditInfo, CanExamine },
})
export default class PipeIdEdit extends mixins<PipeMixin>(PipeMixin) {
  handleDelete() {
    return this.$confirm('此操作将永久删除该应用版本, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.$api.pipe.removeVersion(this.$route.params.id).then(() => {
        this.$I18nRouter.push('/application/pipes')
      })
    })
  }
}
</script>
