<template>
  <div class="container-fluid el-row el-row--flex">
    <div class="el-col el-col-24 pr-20">
      <div class="card">
        <div class="card-header el-row el-row--flex is-align-middle py-5">
          <h2>{{ item.name }}</h2>
        </div>
        <div class="card-body marked-content">
          <el-collapse accordion class="mb-20">
            <el-collapse-item>
              <template slot="title">
                <b>系统自动生成部分（只读）</b>
              </template>
              <div v-marked="readmeBySystem"></div>
            </el-collapse-item>
          </el-collapse>
          <client-only placeholder="Loading...">
            <markdown v-model="readmeByAuthor" />
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
      readmeByAuthor: undefined,
      readmeBySystem: undefined,
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
  mounted() {
    this.readmeBySystem = this.item.readme.by_system || ''
    this.readmeByAuthor = this.item.readme.by_author || ''
  },
}
</script>
