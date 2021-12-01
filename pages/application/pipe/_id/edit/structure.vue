<template>
  <div class="card container-fluid">
    <div class="card-header el-row--flex is-align-middle">
      <h2 class="mx-0 el-col-equal">
        {{ title }}
      </h2>
    </div>
    <div class="card-body">
      <el-tabs v-model="activeName" type="card" :before-leave="onBeforeLeave">
        <el-tab-pane label="编辑内容" name="1">
          <div class="codemirror-box">
            <code-mirror-client v-model="content" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="预览内容" name="2">
          <div v-if="activeName === '2'" class="page-graph-box workflow-box">
            <graph-index :item="graph" :readonly="true" class="h-100" tools="run|plus,minus,fit|auto" />
          </div>
        </el-tab-pane>
        <!--        <el-tab-pane label="可视化编辑" name="3"></el-tab-pane>-->
      </el-tabs>
    </div>
    <div class="card-footer">
      <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import CodeMirrorClient from '@/pages/application/_components/CodeMirrorClient.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  components: {
    CodeMirrorClient,
    LoadingButton,
    GraphIndex,
  },
})
export default class Structure extends PipeItemMixin {
  activeName = '1'
  content = ''

  get title() {
    if (this.$store.getters['pipe/isSoftware']) {
      // 选择新建类型为”工具”或“工具流”时标题显示为“应用参数结构CWL”
      return '应用参数结构CWL'
    } else if (this.$store.getters['pipe/isOperation']) {
      // “工作”或“工作流”时标题显示为“应用参数配置YML”
      return '应用参数配置YML'
    } else if (this.$store.getters['pipe/isDocker']) {
      // 为“docker”时，标题显示为“应用Dockerfile”
      return '应用Dockerfile'
    } else {
      return ''
    }
  }
  get graph() {
    return {
      content: this.content,
      type: this.item.type,
      resource_id: this.item.resource_id,
    }
  }

  async onSubmit() {
    const data = { content: this.content }
    await this.$api.pipe.updateVersion(this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', { content: data.content })
    })
  }
  onBeforeLeave(activeName: string) {
    if (activeName === '3') {
      window.open(`/graph-info/${this.item.resource_id}/edit`, '_blank')
      return false
    }
    return true
  }

  mounted() {
    this.content = this.item.content.toString()
  }
}
</script>

<style lang="scss" scoped>
.workflow-box,
.codemirror-box {
  min-height: 450px;
  height: calc(100vh - 130px);
}
.codemirror-box ::v-deep > .vue-codemirror {
  height: 100%;
  > .CodeMirror {
    height: 100%;
  }
}
</style>
