<template>
  <div class="container-fluid py-10">
    <div class="el-row el-row--flex is-align-middle info-header">
      <div class="el-col-auto px-20">
        <i class="el-icon-s-tools" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 v-truncate="item['name']" class="my-0"></h2>
        <p class="m-y-05">ID: {{ item.pipe_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}</div>
          </div>
          <div v-if="item.latest_rev" class="el-col">
            <div class="title">默认版本</div>
            <div>{{ item.latest_rev }}</div>
          </div>
          <div class="el-col">
            <div class="title">最近更新</div>
            <div>{{ item.updated_at }}</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8 text-right">
        <can-create :is-user="item.provider">
          <nuxt-link v-slot="{ navigate }" :to="localePath({ name: 'application-pipe-new', query: {} })" custom>
            <el-button type="primary" size="small" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 添加版本 </el-button>
          </nuxt-link>
        </can-create>
        <can-create :is-user="item.provider">
          <toggle-edit-info type="primary" size="small" icon="el-icon-edit"> 管理应用 </toggle-edit-info>
        </can-create>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-pipe-repository-id-index" />
      <el-tab-pane label="应用版本" name="application-pipe-repository-id-index-version" />
    </el-tabs>
    <div class="px-20 mt-5 pb-10 no-gutters">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import CanCreate from '@/components/common/CanCreate.vue'
import ToggleEditInfo from '@/pages/application/_components/ToggleEditInfo.vue'
import PipeMixin from '@/pages/application/pipe/repository/_components/PipeRepositoryMixin.vue'
import PipeItemMixin from '@/pages/application/pipe/repository/_components/PipeRepositoryItemMixin.vue'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton, ToggleEditInfo, CanCreate },
})
export default class PipeIdIndex extends mixins<PipeItemMixin>(PipeMixin) {}
</script>
