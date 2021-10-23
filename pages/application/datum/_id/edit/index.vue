<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header el-row el-row--flex is-align-middle py-5">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="card-body marked-content">
        <client-only placeholder="Loading...">
          <markdown v-model="readme" />
        </client-only>
      </div>
      <div class="card-footer">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import marked from '@/directives/marked/marked'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: {
    LoadingButton,
    Markdown: () => {
      if (process.client) {
        return import('@/pages/application/_components/markdown/simple')
      }
    },
  },
  directives: {
    ...marked,
  },
})
export default class DatumIndex extends Vue {
  get item() {
    return this.$store.state.datum
  }
  readme = null
  mounted() {
    this.readme = this.item.readme || ''
  }
  async onSubmit() {
    const data = { readme: this.readme }
    await this.$api.datum.updateVersion(this.item.resource_id, data).then(() => {
      this.$store.commit('datum/UPDATE_CURRENT_DATUM', data)
    })
  }
}
</script>
