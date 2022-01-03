import { Component, Vue } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import { graphTools } from '@/types/graph'

@Component
export default class ToolBoxHelper extends Vue {
  // 事件转发到 ToolBox
  toolEvent(...args: any[]): void {
    this.$emit(GraphEvent.ToolEvent, ...args)
  }
}

export const BUTTON_LIST: graphTools = {
  empty: {
    icon: 'iconfont icon-eraser',
    title: '清空',
    action: 'actionToEmpty',
  },
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
  saveCase: {
    icon: 'el-icon-upload',
    title: '保存为案例',
    action: 'actionSaveCase',
  },
  import: {
    icon: 'el-icon-upload2',
    title: '导入配置',
    action: 'actionImport',
  },
  'import-case': {
    icon: 'el-icon-upload2',
    title: '导入配置',
    action: 'actionImport',
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
