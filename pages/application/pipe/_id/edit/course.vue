<template>
  <div class="container-fluid" style="overflow: inherit">
    <div class="px-15 text-muted">使用教程为一个使用该应用进行计算的完整文档教程。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-doc-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate">新建</el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <el-select v-model="value" filterable placeholder="引用知识库文档">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </div>
        <div class="el-col-auto">
          <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  async asyncData({ app, store }) {
    const item = store.state.pipe
    const docs = await app.$axios.$get('/v1/blogs')
    const options = docs.map((d) => {
      return {
        value: d.id,
        label: d.title,
      }
    })
    return { options, value: item.instruction }
  },
  data() {
    return {
      options: [],
      value: '',
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
  methods: {
    async onSubmit() {
      const data = Object.assign({}, this.item)
      data.instruction = this.value
      delete data._isLoaded
      await this.$$axios.$put('/v2/pipe/' + this.item.resource_id, data).then(() => {
        this.$message.success('保存成功')
        this.$store.commit('pipe/UPDATE_CURRENT_WORKFLOW', { instruction: data.instruction })
      })
    },
  },
}
</script>
