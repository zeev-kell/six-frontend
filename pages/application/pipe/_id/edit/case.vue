<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">运行案例为一个使用该应用进行计算的示例。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <el-select v-model="value" filterable :placeholder="placeholder">
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
import { pipeConstants } from '@/constants/PipeConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  components: { LoadingButton },
  async asyncData({ app, store }) {
    const item = store.state.pipe
    const type = store.getters['pipe/isTool'] ? pipeConstants.items.TYPE_WORK : pipeConstants.items.TYPE_WORKFLOW
    const items = await app.$axios.$get('/v2/pipes', {
      params: {
        type,
      },
    })
    const options = items.map((d: any) => {
      return {
        value: d.pipe_id,
        label: d.name,
      }
    })
    return { options, value: item.profile }
  },
})
export default class Case extends PipeItemMixin {
  profile = {}
  options = []
  value = ''
  get placeholder() {
    return '引用工作' + (this.$store.getters['pipe/isTool'] ? '' : '流')
  }
  async onSubmit() {
    const data = { profile: this.value }
    await this.$api.pipe.updateVersion(this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', { profile: data.profile })
    })
  }
}
</script>
