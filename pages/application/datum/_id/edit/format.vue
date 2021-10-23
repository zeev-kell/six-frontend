<template>
  <div class="card container-fluid">
    <div class="card-body codemirror-box">
      <code-mirror-client v-model="content" />
    </div>
    <div class="card-footer">
      <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import CodeMirrorClient from '@/pages/application/_components/CodeMirrorClient.vue'
import { DatumModel } from '@/types/model/Datum'

@Component({
  components: {
    CodeMirrorClient,
    LoadingButton,
  },
})
export default class DatumFormat extends Vue {
  content = ''
  get item(): DatumModel {
    return this.$store.state.datum
  }
  mounted() {
    this.content = this.item.content?.toString()
  }
  async onSubmit() {
    const data = { content: this.content }
    await this.$api.datum.updateVersion(this.item.resource_id, data).then(() => {
      this.$store.commit('datum/UPDATE_CURRENT_DATUM', { content: data.content })
    })
  }
}
</script>
