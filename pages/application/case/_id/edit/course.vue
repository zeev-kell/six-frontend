<template>
  <div class="container-fluid" style="overflow: inherit">
    <div class="card">
      <div class="card-body">
        <mavon-editor-client v-model="instruction" />
      </div>
      <div class="card-footer">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton, MavonEditorClient },
})
export default class Course extends CaseItemMixin {
  instruction = ''
  async onSubmit() {
    const data = { instruction: this.instruction }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
  mounted() {
    this.instruction = this.item.instruction || ''
  }
}
</script>
