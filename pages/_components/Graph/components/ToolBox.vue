<script lang="ts">
import { SVGArrangePlugin, Workflow } from 'cwl-svg'
import { Component, InjectReactive, Prop, Vue } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import type { CreateElement, VNode } from 'vue'
import { AppValidityState, graphTool } from '@/types/graph'
import { BUTTON_LIST } from '@/pages/_components/Graph/components/ToolBoxHelper/ToolBoxHelper'

@Component({
  components: {
    ToolDownload: () => import('@/pages/_components/Graph/components/ToolBoxHelper/ToolDownload.vue'),
    ToolImport: () => import('@/pages/_components/Graph/components/ToolBoxHelper/ToolImport.vue'),
  },
})
export default class ToolBox extends Vue {
  $refs!: {
    toolDownload: HTMLFormElement
    toolImport: HTMLFormElement
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
  // 导入
  actionImport(): void {
    this.$refs.toolImport.dialogVisible = true
    this.$store.commit('graph/CLEAN_SELECTION')
  }
  // 下载
  actionDownload(): void {
    this.$refs.toolDownload.dialogVisible = true
    this.$store.commit('graph/CLEAN_SELECTION')
  }
  // 清空
  actionToEmpty(): void {
    this.$confirm('此操作将清空当前画布和临时缓存的所有数据, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.toolEvent(GraphEvent.TriggerGraphEmpty)
      this.toolEvent(GraphEvent.TriggerGraphSaveContent)
      this.$message({
        type: 'success',
        message: '清空成功!',
      })
    })
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
        BUTTON_LIST[t].name = t
        return BUTTON_LIST[t]
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
        const dom = this.$createElement('tool-download', {
          on: {
            [GraphEvent.ToolEvent]: this.toolEvent,
          },
          ref: 'toolDownload',
        })
        return [createBtn(btn), dom] as VNode[]
      }
      if (btn.name === 'import' || btn.name === 'import-case') {
        const dom = this.$createElement('tool-import', {
          on: {
            [GraphEvent.ToolEvent]: this.toolEvent,
          },
          ref: 'toolImport',
          props: {
            withCase: btn.name === 'import-case',
          },
        })
        return [createBtn(btn), dom] as VNode[]
      }
      return createBtn(btn)
    }
    return h(
      'div',
      {
        class: 'tool-box right',
      },
      this.toolList.map((group: graphTool[]): VNode => {
        return h(
          'div',
          {
            class: 'tool-group',
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
