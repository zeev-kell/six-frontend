<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">添加案例内容或通过可视化界面配置案例</div>
    <div class="card-body">
      <el-tabs v-model="activeName" type="card" :before-leave="onBeforeLeave">
        <el-tab-pane label="编辑内容" name="1">
          <div class="codemirror-box">
            <code-mirror-json-client v-model="formModel.content" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="可视化界面" name="2">
          <div class="mb-10">
            从公共仓库查找应用：<pipe-select ref="pipeSelect" v-model="formModel.source" :clearable="false" @on-change="onValueChange"></pipe-select>
          </div>
          <div v-if="activeName === '2'" class="page-graph-box workflow-box">
            <graph-index ref="graphIndex" config-type="run" :item="graph" class="h-100" tools="import|download|plus,minus,fit|auto" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="card-footer">
      <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { pipeConstants } from '@/constants/PipeConstants'
import { CommandLineToolFactory, WorkflowFactory } from 'cwlts/models'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import CodeMirrorJsonClient from '@/pages/application/_components/codeMirror/CodeMirrorJsonClient.vue'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import PipeSelect from '@/pages/application/_components/PipeSelect.vue'
import { PipeModel } from '@/types/model/Pipe'

@Component({
  components: { PipeSelect, GraphIndex, CodeMirrorJsonClient, LoadingButton },
})
export default class Work extends CaseItemMixin {
  $refs!: {
    pipeSelect: PipeSelect
    graphIndex: GraphIndex
  }
  activeName = '1'
  formModel: any = {
    content: '',
    workflow: '',
    source: '',
    input: '',
  }

  get graph() {
    return {
      content: this.formModel.workflow,
    }
  }

  // eslint-disable-next-line camelcase
  onValueChange({ pipe_id, value }: any): void {
    this.$confirm('是否替换新的软件运行模板？')
      .then(() => {
        this.$api.pipe.getRevision(pipe_id, value).then((pipe: PipeModel) => {
          let content = pipe?.content
          if (!content) {
            return this.$message.warning('该软件信息不完整')
          }
          content = getObject(content)
          const model = pipe.type === pipeConstants.items.TYPE_TOOL ? CommandLineToolFactory.from(content, 'document') : WorkflowFactory.from(content)
          const nullJob = JobHelper.getNullJobInputs(model)
          this.formModel.workflow = content
          this.formModel.input = nullJob
          this.$refs.graphIndex.dispatchAction('reCreateGraph', content)
          this.$store.commit('graph/SET_JOB_VALUE', nullJob)
          if (Object.keys(nullJob).length === 0) {
            this.$message.warning('该软件没有输入项或者软件输入不完整')
          }
        })
      })
      .finally(() => {
        this.$nextTick(() => {
          this.$refs.pipeSelect.blur()
        })
      })
  }
  async onBeforeLeave(activeName: string) {
    if (activeName === '1') {
      const model = await this.parseContent()
      model.source = this.formModel.source
      model.input = this.$store.state.graph.jobValue
      model.workflow = this.formModel.workflow
      this.formModel.content = JSON.stringify(model, null, 4)
    } else {
      const model = await this.parseContent()
      this.formModel.input = model.input
      this.formModel.source = model.source
      this.formModel.workflow = model.workflow
    }
  }
  parseContent(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const model = JSON.parse(this.formModel.content)
        resolve(model)
      } catch (e) {
        console.log(e)
        this.$message.error('内容格式有误，请检查')
        reject(e)
      }
    })
  }
  async onSubmit(): Promise<void> {
    const content =
      this.activeName === '1'
        ? this.formModel.content
        : JSON.stringify({
            workflow: this.formModel.workflow,
            version: this.content?.version,
            input: this.formModel.input,
            source: this.formModel.source,
          })
    const data = { content }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }

  mounted(): void {
    this.formModel.content = this.item.content
    this.formModel.source = this.content.source
    this.formModel.input = this.content.input
  }
}
</script>
