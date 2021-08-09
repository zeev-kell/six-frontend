<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header el-row el-row--flex is-align-middle py-5">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="card-body marked-content">
        <el-collapse accordion class="mb-20">
          <el-collapse-item>
            <template slot="title">
              <b>系统自动生成部分（只读）</b>
            </template>
            <div v-marked="readmeBySystem" />
          </el-collapse-item>
        </el-collapse>
        <client-only placeholder="Loading...">
          <markdown v-model="readmeByAuthor" />
        </client-only>
      </div>
      <div class="card-footer">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import marked from '@/directives/marked/marked'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  directives: {
    ...marked,
  },
  components: {
    LoadingButton,
    Markdown: () => import('@/pages/application/_components/markdown/simple'),
  },
})
export default class PipeEditIndex extends Vue {
  readmeByAuthor = null
  readmeBySystem = null
  get item() {
    return this.$store.state.pipe
  }
  mounted() {
    this.readmeBySystem = this.item.readme.by_system || ''
    this.readmeByAuthor = this.item.readme.by_author || ''
  }
  async onSubmit() {
    const data = { readme: this.readmeByAuthor }
    await this.$api.pipe.update(this.item.pipe_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_WORKFLOW', data)
    })
  }
}
</script>
