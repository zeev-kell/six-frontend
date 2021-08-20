<script lang="ts">
import { SVGArrangePlugin, Workflow } from 'cwl-svg'
import { Component, InjectReactive, Prop, Vue } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import type { CreateElement, VNode } from 'vue'
import { AppValidityState, graphTool, graphTools } from '@/types/graph'

@Component({
  components: {
    ToolDownload: () => import('@/pages/_components/Graph/components/ToolBoxHelper/ToolDownload.vue'),
  },
})
export default class ToolBox extends Vue {
  $refs!: {
    toolDownload: HTMLFormElement
  }

  @InjectReactive('graph')
  readonly graph!: Workflow

  @Prop({ default: false })
  readonly readonly!: boolean
  @Prop({ default: 'add|plus,minus,fit|auto' })
  readonly tools!: string
  @Prop({
    default() {
      return {}
    },
  })
  readonly validationState!: AppValidityState

  private BUTTON_LIST: graphTools = {
    run: {
      icon: 'el-icon-video-play',
      title: '运行',
      action: 'actionToRun',
    },
    validate: {
      icon: 'el-icon-warning-outline f-16',
      title: '异常',
      action: 'toolEvent',
      eventName: GraphEvent.TriggerGraphWarning,
      type: 'warning',
    },
    download: {
      icon: 'el-icon-download',
      title: '下载',
      action: 'actionDownload',
    },
    auto: {
      icon: 'el-icon-magic-stick',
      title: '自动排版',
      action: 'actionAutoLayout',
    },
    plus: {
      icon: 'el-icon-zoom-in',
      title: '放大',
      action: 'actionUpscale',
    },
    minus: {
      icon: 'el-icon-zoom-out',
      title: '缩小',
      action: 'actionDownscale',
    },
    fit: {
      icon: 'feather icon-maximize-2',
      title: '适应窗口',
      action: 'actionFitToViewport',
    },
  }
  private scaleStep = 0.1
  toolList: graphTool[][] = []

  get showValidation(): boolean {
    return this.tools.includes('validate') && !!(this.validationState.errors.length || this.validationState.warnings.length)
  }

  // 自动排版, 重新排列
  actionAutoLayout(): void {
    this.graph.getPlugin(SVGArrangePlugin).arrange()
  }
  // 放大
  actionUpscale(): void {
    const scale = this.graph.scale
    if (scale < this.graph.maxScale) {
      this.graph.scale = Math.min(scale + this.scaleStep, this.graph.maxScale)
    }
  }
  // 缩小
  actionDownscale(): void {
    const scale = this.graph.scale
    if (scale > this.graph.minScale) {
      this.graph.scale = Math.max(scale - this.scaleStep, this.graph.minScale)
    }
  }
  // 适应窗口
  actionFitToViewport(): void {
    this.graph.fitToViewport()
  }
  // 跳转至运行
  actionToRun(): void {
    this.$I18nRouter.push(`/graph-info/${this.$route.params.id}/set-run`)
  }
  // 下载
  actionDownload() {
    this.$refs.toolDownload.downloadVisible = true
  }
  // 事件冒泡
  toolEvent(eventName: string, ...args: any[]): void {
    this.$emit(GraphEvent.ToolEvent, eventName, ...args)
  }

  // 处理每个按钮的事件
  onClick({ action, eventName }: graphTool): void {
    ;(this as any)[action](eventName)
  }

  mounted(): void {
    // 统一处理为数组
    this.toolList = this.tools.split('|').map((tool): graphTool[] => {
      return tool.split(',').map((t): graphTool => {
        this.BUTTON_LIST[t].name = t
        return this.BUTTON_LIST[t]
      })
    })
  }
  render(h: CreateElement): VNode {
    const createBtn = (btn: graphTool): VNode | string => {
      return h(
        'ElButton',
        {
          attrs: {
            title: btn.title,
          },
          props: {
            icon: btn.icon,
            type: btn.type || 'dark',
            size: 'mini',
          },
          on: {
            click: (): void => {
              this.onClick(btn)
            },
          },
        },
        []
      )
    }
    const renderBtnHelp = (btn: graphTool): VNode | VNode[] | string => {
      // 针对 validate 添加了判断
      if (btn.name === 'validate' && !this.showValidation) {
        return ''
      }
      // 添加 download 的下载窗口
      if (btn.name === 'download') {
        const create = this.$createElement
        const dom = create('tool-download', {
          on: {
            [GraphEvent.ToolEvent]: this.toolEvent,
          },
          ref: 'toolDownload',
        })
        return [createBtn(btn), dom] as VNode[]
      }
      return createBtn(btn)
    }
    return h(
      'div',
      {
        class: 'tool-box',
      },
      this.toolList.map((group: graphTool[]): VNode => {
        return h(
          'div',
          {
            class: 'd-inline-b',
          },
          [
            h(
              'div',
              {
                class: 'el-button-group',
              },
              group.map(renderBtnHelp)
            ),
          ]
        )
      })
    )
  }
}
</script>

<style scoped lang="scss">
.tool-box {
  position: absolute;
  right: 30px;
  top: 10px;
  z-index: 10;
  color: white;

  > .el-button {
    vertical-align: middle;
  }

  ::v-deep {
    .el-button-group {
      > .el-button--mini {
        width: 30px;
        height: 30px;
        padding: 0;
      }
    }
  }
}

.d-inline-b + .d-inline-b {
  margin-left: 4px;
}
</style>
