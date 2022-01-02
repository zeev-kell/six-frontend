<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">使用教程为一个使用该应用进行计算的完整文档教程。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-blog-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <blog-select v-model="instruction" />
        </div>
        <div class="el-col-auto">
          <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import BlogSelect from '@/pages/application/_components/BlogSelect.vue'

@Component({
  components: { BlogSelect, LoadingButton },
})
export default class Course extends PipeItemMixin {
  instruction = ''
  async onSubmit() {
    const data = { instruction: this.instruction }
    await this.$api.pipe.updateRevision(this.item.pipe_id, this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', data)
    })
  }
  mounted(): Promise<any> | void {
    this.instruction = this.item.instruction
  }
}
</script>
