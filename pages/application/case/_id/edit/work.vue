<template>
  <div class="container-fluid">
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <el-form :inline="true">
            <el-form-item class="mb-0">
              <el-select ref="pipeSelect" v-model="formModel.source" filterable placeholder="选择应用" @change="onValueChange">
                <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
            </el-form-item>
            <el-form-item class="mb-0">
              <el-input v-model="formModel.version" placeholder="输入版本"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="el-col-auto">
          <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="codemirror-box">
        <code-mirror-client v-model="formModel.input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import { getObject, stringifyObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { pipeConstants } from '@/constants/PipeConstants'
import { CommandLineToolFactory, WorkflowFactory } from 'cwlts/models'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import { Context } from '@nuxt/types'

@Component({
  components: { LoadingButton, CodeMirrorClient },
  async asyncData({ app }: Context): Promise<any> {
    const items = await app.$api.pipe.getList()
    const options = items.map((d: any) => {
      return {
        value: d.resource_id,
        label: d.name,
      }
    })
    return { options }
  },
})
export default class Work extends CaseItemMixin {
  $refs!: {
    pipeSelect: HTMLFormElement
  }
  options: any[] = []
  formModel: any = {
    workflow: '',
    input: '',
    source: '',
    version: '',
  }

  async onValueChange(resourceId: string): Promise<void> {
    await this.$api.pipe.getVersion(resourceId).then(async (pipe) => {
      let content = pipe?.content
      if (!content) {
        return this.$message.warning('该软件信息不完整')
      }
      // TODO 修改成新的类
      content = getObject(content)
      this.formModel.workflow = content
      if (this.formModel.source && this.formModel.source !== '') {
        await this.$confirm('是否替换新的软件运行模板？').finally(() => {
          this.$refs.pipeSelect.blur()
        })
      }
      const model = pipe.type === pipeConstants.items.TYPE_TOOL ? CommandLineToolFactory.from(content, 'document') : WorkflowFactory.from(content)
      let nullJob = JobHelper.getNullJobInputs(model)
      if (Object.keys(nullJob).length === 0) {
        return this.$message.warning('该软件没有输入项或者软件输入不完整')
      }
      nullJob = stringifyObject(nullJob, false, 2)
      this.formModel.input = nullJob
    })
  }
  async onSubmit(): Promise<void> {
    const data = {
      content: JSON.stringify({
        workflow: this.formModel.workflow,
        version: this.formModel.version,
        input: this.formModel.input,
        source: this.formModel.source,
      }),
    }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
  mounted(): void {
    this.formModel.workflow = this.content?.workflow
    this.formModel.input = JSON.stringify(this.content?.input, null, 2)
    this.formModel.source = this.content?.source
    this.formModel.version = this.content?.version
  }
}
</script>
