<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的应用版本</h2>
        <div class="sub--title">一个应用版本为该应用的一个发布版本，一般包含CWL源码，配套使用教程，运行案例等。</div>
      </div>
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="应用版本" prop="version">
              <el-input v-model="formModel.version" placeholder="请输入版本，例如：v1.0" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header el-row--flex is-align-middle">
        <h2 class="mx-0 el-col-equal">应用参数结构CWL</h2>
      </div>
      <div class="card-body">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="编辑内容" name="1">
            <div class="codemirror-box">
              <code-mirror-client v-model="formModel.content" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="预览内容" name="2">
            <div v-if="activeName === '2'" class="page-graph-box workflow-box">
              <graph-index :item="graph" :readonly="true" class="h-100" tools="plus,minus,fit|auto" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="card-footer">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-plus"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  components: { PipeItemMixin, CodeMirrorClient, LoadingButton, GraphIndex },
})
export default class PipeNewPage extends Vue {
  $refs!: {
    formModel: HTMLFormElement
  }
  activeName = '1'

  formModel: any = {
    version: '',
    content: '',
  }
  rules = {
    version: [
      { required: true, message: '请输入版本', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
  }
  get graph() {
    return {
      content: this.formModel.content,
    }
  }

  async onSubmit(): Promise<void> {
    await this.$refs.formModel.validate()
    await this.$api.pipe.createRevision(this.$route.params.id, this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/pipe/${id}/edit`)
    })
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
