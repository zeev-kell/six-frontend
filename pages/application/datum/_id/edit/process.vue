<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">处理流程为一个处理得到当前数据（包）的一个工作（流）。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <el-select v-model="value" filterable placeholder="引用工作（流）">
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
import { DatumModel } from '@/types/model/Datum'
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'

@Component({
  components: { LoadingButton },
  async asyncData({ app, store }) {
    const item: DatumModel = store.state.datum
    const items = await app.$api.pipe.search({
      term: `type:${pipeConstants.items.TYPE_WORK} OR type:${pipeConstants.items.TYPE_WORKFLOW}`,
      page: 1,
      size: 1000,
    })
    const options = items.data.map((d: any) => {
      return {
        value: d.resource_id, // 不使用 pipe_id ？
        label: d.name,
      }
    })
    return { options, value: item.link_pipes }
  },
})
export default class DatumEditProcess extends DatumItemMixin {
  options = []
  value = ''
  async onSubmit() {
    const data = { link_pipes: this.value }
    await this.$api.datum.update(this.item.data_id, data).then(() => {
      this.$store.commit('datum/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
