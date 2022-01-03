<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import type { CreateElement, VNode } from 'vue'
import { graphTool } from '@/types/graph'
import ToolBox from '@/pages/_components/Graph/components/ToolBox.vue'
import { CASE_LOCAL } from '@/constants/PipeConstants'
import { setStore } from '@/utils/local-storage'

@Component({
  components: {
    ToolDownload: () => import('@/pages/_components/Graph/components/ToolBoxHelper/ToolDownload.vue'),
    ToolImport: () => import('@/pages/_components/Graph/components/ToolBoxHelper/ToolImport.vue'),
  },
})
export default class ToolBoxLeft extends ToolBox {
  $refs!: {
    toolDownload: HTMLFormElement
    toolImport: HTMLFormElement
  }
  actionSaveCase(): void {
    const data = this.$parent.exportCwlt('json', true)
    data.version = 'v1.0.0'
    setStore(CASE_LOCAL, data.data)
    this.$I18nRouter.push({ name: 'application-case-new', query: { local: true, resource_id: this.$route.params.id } })
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
        class: 'tool-box left',
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
