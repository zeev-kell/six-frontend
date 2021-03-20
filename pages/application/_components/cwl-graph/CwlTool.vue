<script type="text/babel">
  import { SVGArrangePlugin, Workflow } from 'cwl-svg'
  import { DeletionPlugin } from 'cwl-svg/compiled/src/plugins/deletion/deletion'
  const BUTTON_LIST = {
    run: {
      icon: 'el-icon-video-play',
      title: '运行',
      action: 'toRun',
    },
    plus: {
      icon: 'el-icon-plus',
      title: '放大',
      action: 'upscale',
    },
    minus: {
      icon: 'el-icon-minus',
      title: '缩小',
      action: 'downscale',
    },
    fit: {
      icon: 'iconfont icon-fullscreen',
      title: '适应窗口',
      action: 'fitToViewport',
    },
    auto: {
      icon: 'el-icon-magic-stick',
      title: '自动排版',
      action: 'autoLayout',
    },
    download: {
      icon: 'el-icon-download',
      title: '下载',
      action: 'download',
    },
  }

  export default {
    name: 'CwlTool',
    props: {
      workflow: {
        type: Workflow,
        default: null,
      },
      tools: {
        type: [String, Array],
        default: 'plus,minus,fit|auto',
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        scaleStep: 0.1,
      }
    },
    methods: {
      // 自动排版
      autoLayout() {
        // 第一次调用居中，第二次调用重新排列
        this.workflow.getPlugin(SVGArrangePlugin).arrange()
      },
      // 放大
      upscale() {
        const scale = this.workflow.scale
        if (scale < this.workflow.maxScale) {
          this.workflow.scale = Math.min(scale + this.scaleStep, this.workflow.maxScale)
        }
      },
      // 缩小
      downscale() {
        const scale = this.workflow.scale
        if (scale > this.workflow.minScale) {
          this.workflow.scale = Math.max(scale - this.scaleStep, this.workflow.minScale)
        }
      },
      // 适应窗口
      fitToViewport() {
        this.workflow.fitToViewport()
      },
      // 删除选择的元素
      deleteSelectedElement() {
        this.graph.getPlugin(DeletionPlugin).deleteSelection()
      },
      toRun() {
        this.$router.push(`/graph-info/${this.$route.params.id}/set-run`)
      },
      download() {
        this.TheGraph.exportJob()
      },
    },
    inject: ['TheGraph'],
    render(createElement) {
      const tools = this.tools.split('|')
      const createButton = (b) => {
        const btn = BUTTON_LIST[b]
        return createElement('el-button', {
          // 普通的 HTML attribute
          attrs: {
            title: btn.title,
          },
          // 组件 prop
          props: {
            type: 'dark',
            size: 'mini',
            icon: btn.icon,
          },
          ...BUTTON_LIST[b],
          on: {
            click: this[btn.action],
          },
        })
      }
      return createElement(
        'div',
        { class: 'cwl-tool' },
        tools.map((t) => {
          if (t.includes(',')) {
            t = t.split(',')
            return createElement('el-button-group', t.map(createButton))
          }
          return createButton(t)
        })
      )
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  .cwl-tool {
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 10;
    color: white;
    > .el-button {
      vertical-align: middle;
    }
  }
  .el-button--mini {
    padding: 8px;
  }
  .el-button-group + .el-button,
  .el-button + .el-button-group {
    margin-left: 4px;
  }
</style>
