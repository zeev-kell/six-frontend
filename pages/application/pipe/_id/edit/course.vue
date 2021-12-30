<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">使用教程为一个使用该应用进行计算的完整文档教程。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-doc-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <el-select v-model="instruction" filterable placeholder="引用知识库文档">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
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

@Component({
  components: { LoadingButton },
  async asyncData({ app, store }) {
    const item = store.state.pipe
    const docs = await app.$api.blog.getList()
    const options = docs.map((d: any) => {
      return {
        value: d.id,
        label: d.title,
      }
    })
    const instruction = item.instruction ? Number(item.instruction) : null
    return { options, instruction }
  },
})
export default class Course extends PipeItemMixin {
  options = []
  instruction = ''
  async onSubmit() {
    const data = { instruction: this.instruction }
    await this.$api.pipe.updateRevision(this.item.pipe_id, this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
