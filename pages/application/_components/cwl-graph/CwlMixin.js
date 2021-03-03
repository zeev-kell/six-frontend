import * as Yaml from 'js-yaml'

export default {
  data() {
    return {
      workflow: null,
      cwlState: null,
      dataModel: null,
      workflowWrapper: null,
      validationState: {},
    }
  },
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
  },
  beforeDestroy() {
    // 销毁流程图
    this.workflow?.destroy()
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
    load(cwl) {
      if (typeof cwl === 'string') {
        return Yaml.load(cwl, { json: true })
      }
      return cwl
    },
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
  watch: {
    cwl() {
      this.cwlState = this.load(this.cwl)
    },
    workflow() {
      this.$emit('workflow-changed', this.workflow)
    },
  },
}
