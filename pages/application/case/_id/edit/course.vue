<template>
  <div class="container-fluid" style="overflow: inherit">
    <div class="px-15 text-muted">使用教程为一个使用该应用进行计算的完整文档教程。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-doc-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <blog-select v-model="instruction"></blog-select>
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
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import BlogSelect from '@/pages/application/_components/BlogSelect.vue'

@Component({
  components: { BlogSelect, LoadingButton },
  asyncData({ store }) {
    const item = store.state.pipe
    return { instruction: item.instruction }
  },
})
export default class Course extends CaseItemMixin {
  instruction = ''
  async onSubmit() {
    const data = { instruction: this.instruction }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
