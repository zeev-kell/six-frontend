<template>
  <div class="card container-fluid">
    <div class="card-body codemirror-box">
      <client-only placeholder="Loading...">
        <codemirror v-model="content" :options="cmOptions" />
      </client-only>
    </div>
    <div class="card-footer">
      <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: {
    LoadingButton,
    codemirror: () => {
      if (process.client) {
        return import('@/pages/application/_components/CodeMirror.vue')
      }
    },
  },
})
export default class DatumFormat extends Vue {
  content = ''
  cmOptions = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/yaml',
    lineWrapping: true,
    theme: 'default',
  }
  get item() {
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
