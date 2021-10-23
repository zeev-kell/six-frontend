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
import { PipeModel } from '@/types/model/Pipe'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: { LoadingButton },
  async asyncData({ app, store }) {
    const item = store.state.datum
    const items = await app.$axios.$get('/v2/pipes', {
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
    return { options, value: item.profile }
  },
})
export default class process extends Vue {
  profile = {}
  options = []
  value = ''

  $refs!: {
    graph: HTMLFormElement
  }

  pipeItem!: PipeModel

  get item() {
    return this.$store.state.datum
  }
}
</script>
