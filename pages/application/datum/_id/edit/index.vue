<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header el-row el-row--flex is-align-middle py-5">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="card-body marked-content">
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
import LoadingButton from '@/components/LoadingButton.vue'
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'

@Component({
  components: {
    MavonEditorClient,
    LoadingButton,
  },
})
export default class DatumIndex extends DatumItemMixin {
  readme = ''
  mounted() {
    this.readme = this.item.readme || ''
  }
  async onSubmit() {
    const data = { readme: this.readme }
    await this.$api.datum.update(this.item.data_id, data).then(() => {
      this.$store.commit('datum/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
