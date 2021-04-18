<template>
  <div class="graph-job-editor h-100 el-row el-row--flex">
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
  import CwlPanelParams from '@/pages/application/_components/graph/CwlPanelParams'
  import CwlPanelRun from '@/pages/application/_components/graph/CwlPanelRun'
  import GraphTool from '@/pages/application/_components/graph/GraphTool'
  import { stringifyObject } from '@/pages/application/_components/graph/helpers/YamlHelper'
  import { FormControl } from '@/pages/application/_components/FormControl'
  import { DblclickPlugin } from '@/pages/application/_components/graph/plugins/dblclick-plugin'
  import { downloadStrLink } from '@/utils/download-link'
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, ZoomPlugin } from 'cwl-svg'
  import * as Yaml from 'js-yaml'

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
        jobControl: new FormControl({}),
      }
    },
    computed: {
      pipeId() {
        return this.item && this.item.pipe_id
      },
    },
    watch: {
      workflow() {
        this.$emit('workflow-changed', this.workflow)
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
        this.cwlState = this.load(this.cwl)
      }
      // FIX 鼠标滚动事件捕抓
      this.$refs.svg.addEventListener(
        'wheel',
        (event) => {
          event.preventDefault()
        },
        true
      )
    },
    methods: {
      // 导出数据
      serialize(asYaml = false) {
        const obj = this.workflow.model.serialize()
        return stringifyObject(obj, asYaml)
      },
      exportCwl(format = 'yaml', isOnlyData = false) {
        const asYaml = format === 'yaml'
        const data = stringifyObject(this.workflow.model.serialize(), asYaml)
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
      // 处理 yaml 格式为 json 格式
      load(cwl) {
        if (typeof cwl === 'string') {
          return Yaml.load(cwl, { json: true })
        }
        return cwl
      },
      getDefaultPlugins() {
        return [
          new SVGArrangePlugin(),
          new SVGEdgeHoverPlugin(),
          new SelectionPlugin(),
          new DblclickPlugin(),
          new ZoomPlugin(),
        ]
      },
    },
  }
</script>
