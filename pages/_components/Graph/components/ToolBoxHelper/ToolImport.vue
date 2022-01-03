<template>
  <el-dialog
    title="导入参数配置"
    class="el-dialog-dark"
    custom-class="tool-import-dialog"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    center
    top="10vh"
  >
    <el-tabs v-model="activeName" size="small">
      <el-tab-pane v-if="withCase" name="1">
        <div slot="label" class="px-20">从案例中导入</div>
        <div class="el-row p-20">
          <div class="el-col-12">
            <p>从公共仓库查找案例以导入参数配置</p>
            <case-select v-model="caseId" @change="onChangeCase" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <div slot="label" class="px-20">导入文件</div>
        <div class="text-center p-20">
          <p>选择要导入的JSON或YAML文件</p>
          <el-upload drag action="" :auto-upload="false" :on-change="onChangeFile" :show-file-list="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <p v-if="importError" class="import-error text-danger m-1">Error: {{ importError }}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane name="3">
        <div slot="label" class="px-20">填写参数源码</div>
        <code-mirror-client ref="codeMirror" v-model="code" />
        <div class="text-right p-10">
          <el-button size="mini" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="onSubmitCode">确定</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'
import ToolBoxHelper from '@/pages/_components/Graph/components/ToolBoxHelper/ToolBoxHelper'
import { getObject, getParseObject, parseObj } from '@/pages/_components/Graph/helpers/YamlHandle'
import CaseSelect from '@/pages/application/_components/CaseSelect.vue'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'
import { Prop } from 'vue-property-decorator'
@Component({
  components: { CodeMirrorClient, CaseSelect },
})
export default class ToolDownload extends ToolBoxHelper {
  $refs!: {
    codeMirror: CodeMirrorClient
  }
  @Prop({ default: true })
  withCase!: boolean
  dialogVisible = false
  activeName = this.withCase ? '1' : '2'
  importError = ''
  caseId = ''
  code = ''

  @Watch('dialogVisible')
  onWatchDialogVisible(value: boolean): void {
    if (!value) {
      this.code = ''
      this.caseId = ''
      this.importError = ''
      this.activeName = this.withCase ? '1' : '2'
    }
  }
  @Watch('activeName')
  onWatchActiveName(value: string): void {
    if (value === '3') {
      this.$refs.codeMirror.refresh()
    }
  }

  async onChangeCase(id: string): Promise<any> {
    const item = await this.$api.case.get(id)
    const content = parseObj(item.content)
    if (!content || !content.input) {
      return this.$message.error('案例内容不规范')
    }
    this.$store.commit('graph/SET_JOB_VALUE', content.input)
    this.dialogVisible = false
  }
  onChangeFile(file: any): void {
    this.readFile(file.raw as File)
  }
  onSubmitCode(): void {
    const code = getObject(this.code)
    this.$store.commit('graph/SET_JOB_VALUE', code)
    this.dialogVisible = false
  }
  readFile(file: File): void {
    this.importError = ''
    const render = new FileReader()
    render.readAsText(file, 'UTF-8')
    render.onload = async (e: any) => {
      const str = e.target.result
      try {
        const job = await getParseObject(str)
        this.$store.commit('graph/SET_JOB_VALUE', job)
        this.dialogVisible = false
      } catch (e: any) {
        this.importError = e.message
      }
    }
  }
}
</script>

<style lang="scss">
.tool-import-dialog {
  .el-tabs__header {
    margin: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-tabs__content {
    min-height: 300px;
  }
  .el-tabs__item {
    padding: 0;
  }
}
</style>
