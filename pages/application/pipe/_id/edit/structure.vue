<template>
  <div class="card">
    <div class="card-header el-row--flex is-align-middle">
      <h2 class="mx-0 el-col-equal">{{ title }}</h2>
    </div>
    <div class="card-body">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="编辑内容" name="1">
          <div class="codemirror-box">
            <client-only placeholder="Loading...">
              <codemirror v-model="content" :options="cmOptions" />
            </client-only>
          </div>
        </el-tab-pane>
        <el-tab-pane label="预览内容" name="2">
          <div v-if="activeName === '2'" class="workflow-box">
            <graph-index :item="item" :readonly="true" class="h-100" tools="run|plus,minus,fit|auto" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/babel">
import GraphIndex from '@/pages/application/_components/graph/GraphIndex'
export default {
  components: {
    GraphIndex,
    codemirror: () => import('@/pages/application/_components/CodeMirror'),
  },
  data() {
    return {
      activeName: '1',
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/yaml',
        lineWrapping: true,
        theme: 'default',
      },
      content: '',
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
    title() {
      if (this.$store.getters['pipe/isApp']) {
        // 选择新建类型为”工具”或“工具流”时标题显示为“应用参数结构CWL”
        return '应用参数结构CWL'
      } else if (this.$store.getters['pipe/isWork']) {
        // “工作”或“工作流”时标题显示为“应用参数配置YML”
        return '应用参数配置YML'
      } else if (this.$store.getters['pipe/isDocker']) {
        // 为“docker”时，标题显示为“应用Dockerfile”
        return '应用Dockerfile'
      } else {
        return ''
      }
    },
  },
  mounted() {
    this.content = this.item.content.toString()
  },
}
</script>

<style lang="scss" scoped>
.workflow-box,
.codemirror-box {
  min-height: 450px;
  height: calc(100vh - 60px);
}
.codemirror-box ::v-deep > .vue-codemirror {
  height: 100%;
  > .CodeMirror {
    height: 100%;
  }
}
</style>
