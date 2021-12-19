<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header el-row el-row--flex is-align-middle py-5">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="card-body">
        <el-collapse accordion class="mb-20">
          <el-collapse-item>
            <template slot="title">
              <b>系统自动生成部分（只读）</b>
            </template>
            <mavon-editor-render-client v-model="readmeBySystem" />
          </el-collapse-item>
        </el-collapse>
        <mavon-editor-client v-model="readmeByAuthor" />
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
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'

@Component({
  components: {
    MavonEditorClient,
    MavonEditorRenderClient,
    LoadingButton,
  },
})
export default class PipeEditIndex extends PipeItemMixin {
  readmeByAuthor = null
  readmeBySystem = null
  async onSubmit() {
    const data = { readme: this.readmeByAuthor }
    await this.$api.pipe.update(this.item.pipe_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', {
        readme: {
          by_system: this.readmeBySystem,
          by_author: this.readmeByAuthor,
        },
      })
    })
  }
  mounted() {
    this.readmeBySystem = this.item.readme.by_system || ''
    this.readmeByAuthor = this.item.readme.by_author || ''
  }
}
</script>
