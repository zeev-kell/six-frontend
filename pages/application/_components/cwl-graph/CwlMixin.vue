<template>
  <div class="tool-graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" oncontextmenu="return false"></svg>
      <cwl-tool :workflow="workflow" />
    </div>
    <transition name="el-fade-in-linear">
      <cwl-params-panel v-if="configType === 'params'" ref="panel" :workflow="workflow" :readonly="readonly" />
      <cwl-run-panel v-else ref="panel" :workflow="workflow" :readonly="readonly" />
    </transition>
  </div>
</template>

<script type="text/babel">
  import CwlParamsPanel from '@/pages/application/_components/cwl-graph/CwlParamsPanel'
  import CwlRunPanel from '@/pages/application/_components/cwl-graph/CwlRunPanel'
  import cwlTool from '@/pages/application/_components/cwl-graph/CwlTool'
  import { DblclickPlugin } from '@/pages/application/_components/cwl-graph/plugins/dblclick-plugin'
  import { SelectionPlugin, SVGArrangePlugin, SVGEdgeHoverPlugin, ZoomPlugin } from 'cwl-svg'
  import * as Yaml from 'js-yaml'

  export default {
    components: { CwlRunPanel, cwlTool, CwlParamsPanel },
    props: {
      cwl: {
        type: [Object, String],
        default: null,
        note: `The JSON object representing the CWL workflow to render`,
      },
      readonly: {
        type: Boolean,
        default: false,
        note: `True if the workflow is editable`,
      },
      plugins: {
        type: Array,
        default: () => [],
        note: `A list of CWL plugins to use in the CWL rendering`,
      },
      isTool: {
        type: Boolean,
        default: true,
        note: `True if the cwl is commandline`,
      },
      configType: {
        type: String,
        default: 'params',
      },
    },
    data() {
      return {
        workflow: null,
        cwlState: null,
        dataModel: null,
        workflowWrapper: null,
        validationState: {},
      }
    },
    watch: {
      cwl() {
        this.cwlState = this.load(this.cwl)
      },
      workflow() {
        this.$emit('workflow-changed', this.workflow)
      },
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
      afterModelValidation() {
        this.validationState = {
          ...this.validationState,
          errors: this.dataModel.errors || [],
          warnings: this.dataModel.warnings || [],
          isPending: false,
        }
      },
      // 导出数据
      serialize(asYaml = false) {
        const obj = this.workflow.model.serialize()
        if (asYaml) {
          return Yaml.dump(obj, {
            json: true,
          })
        }
        return JSON.stringify(
          obj,
          (key, value) => {
            if (typeof value === 'string') {
              return value.replace(/\u2002/g, ' ')
            }
            return value
          },
          4
        )
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
