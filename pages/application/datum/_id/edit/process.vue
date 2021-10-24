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
import { Component, Vue } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import { DatumModel } from '@/types/model/Datum'

@Component({
  components: { LoadingButton },
  async asyncData({ app, store }) {
    const item: DatumModel = store.state.datum
    const items = await app.$api.pipe.getList({
      params: {
        type: [pipeConstants.items.TYPE_WORK, pipeConstants.items.TYPE_WORKFLOW],
      },
    })
    const options = items.map((d: any) => {
      return {
        value: d.pipe_id,
        label: d.name,
      }
    })
    return { options, value: item.link_pipes }
  },
})
export default class DatumEditProcess extends Vue {
  options = []
  value = ''

  get item() {
    return this.$store.state.datum
  }
  async onSubmit() {
    const data = { link_pipes: this.value }
    await this.$api.datum.updateVersion(this.item.resource_id, data).then(() => {
      this.$store.commit('datum/UPDATE_CURRENT_DATUM', data)
    })
  }
}
</script>
