<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">运行案例为一个使用该应用进行计算的示例。</div>
    <div class="card-body">
      <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
        <el-button type="primary" @click="navigate" @keypress.enter="navigate">新建</el-button>
      </nuxt-link>
      <span class="m-x-1">或</span>
      <el-select v-model="value" filterable placeholder="引用工作">
        <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script type="text/babel">
import pipeConstants from '@/constants/PipeConstants'

export default {
  async asyncData({ app, store }) {
    const item = store.state.pipe
    const items = await app.$axios.$get('/v1/pipes', {
      params: {
        type: pipeConstants.Constants.get('TYPE_WORK'),
      },
    })
    const options = items.map((d) => {
      return {
        value: d.pipe_id,
        label: d.name,
      }
    })
    return { options, value: item.profile }
  },
  data() {
    return {
      profile: {},
      options: [],
      value: '',
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
}
</script>

<style lang="scss" scoped>
.workflow-box {
  min-height: 450px;
  height: calc(100vh - 60px);
}
</style>
