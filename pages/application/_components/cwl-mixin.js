import * as Yaml from 'js-yaml'

export default {
  data() {
    return {
      validationState: {},
    }
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
}
