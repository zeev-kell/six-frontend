<template>
  <div class="graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100"></svg>
      <graph-tool :workflow="workflow" :tools="tools || undefined" />
    </div>
    <transition name="el-fade-in-linear">
      <cwl-panel-params v-if="configType === 'params'" ref="panel" :workflow="workflow" :readonly="readonly" />
      <cwl-panel-run v-else ref="panel" :workflow="workflow" :readonly="false" :pipe-id="pipeId" />
    </transition>
  </div>
</template>

<script type="text/babel">
import { GraphEvent } from '@/constants/GraphEvent'
import CwlPanelParams from '@/pages/application/_components/graph/CwlPanelParams'
import CwlPanelRun from '@/pages/application/_components/graph/CwlPanelRun'
import GraphTool from '@/pages/application/_components/graph/GraphTool'
import { SVGJobFileDropPlugin } from '@/pages/application/_components/graph/plugins/job-file-drop'
import { SVGRequiredInputMarkup } from '@/pages/application/_components/graph/plugins/required-input-markup'
import { getObject, stringifyObject } from '@/pages/application/_components/graph/helpers/YamlHandle'
import { FormControl } from '@/pages/application/_components/FormControl'
import { DblclickPlugin } from '@/pages/application/_components/graph/plugins/dblclick-plugin'
import { downloadStrLink } from '@/utils/download-link'
import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, ZoomPlugin } from 'cwl-svg'
import { WorkflowModel } from 'cwlts/models/generic/WorkflowModel'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'

export default {
  components: { CwlPanelRun, GraphTool, CwlPanelParams },
  props: {
    cwl: {
      type: [Object, String],
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: Array,
      default() {
        return []
      },
    },
    configType: {
      type: String,
      default: 'params',
    },
    tools: {
      type: [String, Array],
      default: undefined,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      workflow: null,
      cwlState: null,
      dataModel: null,
      modelCreated: false,
      jobControl: new FormControl({}),
      validationState: {},
    }
  },
  computed: {
    pipeId() {
      return this.item?.resource_id
    },
    isRunJob() {
      return this.configType === 'run'
    },
    defaultPlugins() {
      const plugins = [...this.plugins, ...this.getDefaultPlugins()]
      if (this.isRunJob) {
        plugins.push(new SVGJobFileDropPlugin(), new SVGRequiredInputMarkup())
      }
      return plugins
    },
  },
  watch: {
    workflow() {
      this.$emit('workflow-changed', this.workflow)
    },
    cwlState(json) {
      this.createModel(json)
      if (this.isRunJob) {
        this.updateJob({})
      }
    },
  },
  provide() {
    return {
      TheGraph: this,
      dataModel: this.dataModel,
    }
  },
  beforeDestroy() {
    // 销毁流程图
    this.workflow?.destroy()
  },
  mounted() {
    // FIX 第一次没有监听到变化
    if (this.cwl && this.cwlState === null) {
      // 处理 yaml 格式为 json 格式
      this.cwlState = getObject(this.cwl)
      this.$nextTick(() => {
        // 自动放缩 并且 调整排版
        this.workflow?.getPlugin(SVGArrangePlugin).arrange()
      })
    }
    // FIX 鼠标滚动事件捕抓
    if (!this.readonly) {
      this.$refs.svg.addEventListener(
        'wheel',
        (event) => {
          event.preventDefault()
        },
        true
      )
      this.$on(GraphEvent.PayloadUpdateJob, (job) => {
        this.updateJob(job)
      })
    }
  },
  methods: {
    // 导出数据
    serialize(asYaml = false) {
      const obj = this.workflow.model.serialize()
      return stringifyObject(obj, asYaml)
    },
    exportCwl(format = 'yaml', isOnlyData = false) {
      const asYaml = format === 'yaml'
      const serialize = this.dataModel instanceof WorkflowModel ? this.dataModel.serializeEmbedded() : this.dataModel.serialize()
      const data = stringifyObject(serialize, asYaml)
      const name = this.item.name + `.${asYaml ? 'cwl' : format}`
      if (isOnlyData) {
        return { data, name }
      }
      downloadStrLink(data, name)
    },
    exportJob(format = 'yaml', isOnlyData = false) {
      const data = stringifyObject(this.jobControl.value, format === 'yaml')
      const name = this.item.name + `.job.${format}`
      if (isOnlyData) {
        return { data, name }
      }
      downloadStrLink(data, name)
    },
    getDefaultPlugins() {
      // 默认可以放缩，选择节点，线条悬浮，自动放缩
      const plugins = [new SVGArrangePlugin(), new SVGEdgeHoverPlugin(), new SelectionPlugin(), new DblclickPlugin()]
      if (!this.readonly) {
        plugins.push(new ZoomPlugin())
      }
      return plugins
    },
    afterModelValidation() {
      this.validationState = {
        ...this.validationState,
        errors: this.dataModel.errors || [],
        warnings: this.dataModel.warnings || [],
        isPending: false,
      }
    },
    updateJob(jobObject = {}) {
      const normalizedJob = this.normalizeJob(jobObject)
      const controlValue = normalizedJob
      this.jobControl.setValue(controlValue)
      this.workflow?.getPlugin(SVGJobFileDropPlugin)?.updateToJobState(controlValue)
      // If we modified the job, push the update back
      if (JSON.stringify(normalizedJob) !== JSON.stringify(jobObject)) {
        // this.metaManager.patchAppMeta('job', normalizedJob)
      }
    },
    normalizeJob(jobObject) {
      const nullJob = JobHelper.getNullJobInputs(this.workflow.model)
      const job = jobObject || {}
      for (const key of Object.keys(job)) {
        // eslint-disable-next-line no-prototype-builtins
        if (!nullJob.hasOwnProperty(key)) {
          delete job[key]
        }
      }
      return { ...nullJob, ...job }
    },
    afterModelCreated(isFirstCreation) {
      if (isFirstCreation) {
        // 只有第一次催发创建
        this.$emit(GraphEvent.TriggerModalCreate)
      }
    },
  },
}
</script>
