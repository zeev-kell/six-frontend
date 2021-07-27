<template>
  <div class="container-fluid el-row el-row--flex">
    <div class="el-col el-col-24 pr-20">
      <div class="card">
        <div class="card-header el-row el-row--flex is-align-middle py-5">
          <h2>{{ item.name }}</h2>
        </div>
        <div class="card-body marked-content">
          <client-only placeholder="Codemirror Loading...">
            <markdown v-model="readme" />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import marked from '@/directives/marked'

export default {
  directives: {
    ...marked,
  },
  components: {
    Markdown: () => import('@/pages/application/_components/markdown/simple'),
  },
  data() {
    return {
      readme: undefined,
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
  mounted() {
    this.readme = this.item.readme
  },
}
</script>
