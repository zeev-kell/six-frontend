<script lang="ts">
import { SVGArrangePlugin, Workflow } from 'cwl-svg'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import type { CreateElement, VNode } from 'vue'
import { AppValidityState, graphTool, graphTools } from '../types'

@Component
export default class ToolBox extends Vue {
  @Prop({ required: true })
  readonly graph!: Workflow
  @Prop({ default: false })
  readonly readonly!: boolean
  @Prop({
    default() {
      return 'add|plus,minus,fit|auto'
    },
  })
  readonly tools!: string
  @Prop({
    default() {
      return {}
    },
  })
  readonly validationState!: AppValidityState

  private BUTTON_LIST: graphTools = {
    validate: {
      icon: 'el-icon-warning-outline f-16',
      title: '异常',
      action: 'actionEmitEvent',
      eventName: GraphEvent.TriggerWarning,
      type: 'warning',
    },
    add: {
      icon: 'el-icon-plus',
      title: '新增Task',
      action: 'actionEmitEvent',
      eventName: GraphEvent.TriggerAdd,
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
  // 事件冒泡
  actionEmitEvent(eventName: string): void {
    this.$emit('toolbox-event', eventName)
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
      // 针对 validate 添加了判断
      if (btn.name === 'validate' && !this.showValidation) {
        return ''
      }
      return h(
        'ElButton',
        {
          props: {
            icon: btn.icon,
            title: btn.title,
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
              group.map(createBtn)
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
