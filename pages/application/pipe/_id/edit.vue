<template>
  <div class="container-fluid py-10">
    <div class="el-row el-row--flex is-align-middle info-header">
      <div class="el-col-auto px-20">
        <i class="el-icon-s-tools" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 v-truncate="item['name']" class="my-0"></h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}</div>
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
        <toggle-edit-info type="warning" icon="el-icon-back"> 返回详情 </toggle-edit-info>
        <can-create :is-user="item.provider">
          <nuxt-link v-slot="{ navigate }" :to="localePath({ name: 'application-pipe-repository-id-new', params: { id: item.pipe_id } })" custom>
            <el-button type="primary" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 添加版本 </el-button>
          </nuxt-link>
        </can-create>
        <can-create :is-user="item.provider">
          <loading-button type="danger" icon="el-icon-delete" class="mx-0" :callback="handleDelete"> 删除版本 </loading-button>
        </can-create>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-pipe-id-edit" />
      <!--      <el-tab-pane v-if="isWork" label="工作结构" name="application-pipe-id-edit-work" />-->
      <el-tab-pane label="工具结构" name="application-pipe-id-edit-structure" />
      <el-tab-pane label="使用教程" name="application-pipe-id-edit-course" />
      <el-tab-pane label="运行案例" name="application-pipe-id-edit-case" />
      <el-tab-pane label="应用版本" name="application-pipe-id-edit-version" />
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
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  components: { LoadingButton, LayoutBox, ToggleEditInfo, CanExamine },
})
export default class PipeIdEdit extends mixins<PipeItemMixin>(PipeMixin) {
  handleDelete(): Promise<any> {
    return this.$confirm('此操作将永久删除该应用版本, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.$api.pipe.deleteRevision(this.item.pipe_id, this.$route.params.id).then(() => {
        this.$I18nRouter.push('/application/pipe/repository/' + this.item.pipe_id)
      })
    })
  }
}
</script>
