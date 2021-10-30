<template>
  <div class="container-fluid">
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <el-select ref="pipeSelect" v-model="value" filterable :placeholder="placeholder" @change="onValueChange">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </div>
        <div class="el-col-auto">
          <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="codemirror-box">
        <code-mirror-client v-model="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import { getObject, stringifyObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { CommandLineToolFactory, WorkflowFactory } from 'cwlts/models'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import CodeMirrorClient from '@/pages/application/_components/CodeMirrorClient.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: {
    LoadingButton,
    CodeMirrorClient,
  },
  async asyncData({ app, store }) {
    const item = store.state.pipe
    const type = store.getters['pipe/isWork'] ? pipeConstants.items.TYPE_TOOL : pipeConstants.items.TYPE_APP
    const items = await app.$axios.$get('/v2/pipes', {
      params: {
        type,
      },
    })
    const options = items.map((d: any) => {
      return {
        value: d.resource_id,
        label: d.name,
      }
    })
    const value = item.cwl
    const graphItem = value ? await app.$api.pipe.getVersion(value) : undefined
    return { options, value, graphItem }
  },
})
export default class Work extends PipeItemMixin {
  $refs!: {
    graph: HTMLFormElement
    pipeSelect: HTMLFormElement
  }
  graphItem = null
  options = []
  content = ''
  value = ''

  get placeholder() {
    return '引用工作' + (this.$store.getters['pipe/isTool'] ? '' : '流')
  }
  mounted() {
    this.content = this.item?.content.toString()
  }
  async onSubmit() {
    const data = {
      cwl: this.value,
      content: this.content,
    }
    await this.$api.pipe.updateVersion(this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', data)
    })
  }
  async onValueChange(resourceId: string) {
    if (this.content && this.content !== '') {
      await this.$confirm('是否替换新的软件运行模板？').finally(() => {
        this.$refs.pipeSelect.blur()
      })
    }
    await this.$api.pipe.getVersion(resourceId).then((pipe) => {
      let content = pipe?.content
      if (!content) {
        return this.$message.warning('该软件信息不完整')
      }
      // TODO 修改成新的类
      content = getObject(content)
      const model = pipe.type === pipeConstants.items.TYPE_TOOL ? CommandLineToolFactory.from(content, 'document') : WorkflowFactory.from(content)
      let nullJob = JobHelper.getNullJobInputs(model)
      if (Object.keys(nullJob).length === 0) {
        return this.$message.warning('该软件没有输入项或者软件输入不完整')
      }
      nullJob = stringifyObject(nullJob, true)
      this.content = nullJob
    })
  }
}
</script>
