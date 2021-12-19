<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header el-row el-row--flex is-align-middle py-5">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="card-body">
        <mavon-editor-client v-model="readme" />
      </div>
      <div class="card-footer">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'

@Component({
  components: { MavonEditorClient, LoadingButton, MavonEditorRenderClient },
})
export default class CaseIndex extends CaseItemMixin {
  readme = ''
  async onSubmit() {
    const data = { readme: this.readme }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
  mounted() {
    this.readme = this.item.readme || ''
  }
}
</script>
