<template>
  <div class="container-fluid">
    <div class="card-body">
      <div class="codemirror-box">
        <code-mirror-client v-model="contentStr" />
      </div>
    </div>
    <div class="card-footer">
      <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton, CodeMirrorClient },
})
export default class Work extends CaseItemMixin {
  contentStr = ''

  mounted() {
    this.contentStr = this.item?.content
  }
  async onSubmit() {
    const data = {
      content: this.contentStr,
    }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
