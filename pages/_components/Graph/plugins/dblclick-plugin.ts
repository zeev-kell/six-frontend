/**
 * 双击选择插件
 * 需要在 SelectionPlugin 下优化样式
 * 会触发 单击 选择 插件
 */

import { Workflow } from 'cwl-svg'
import { PluginHelp, SVG_TYPE } from '@/pages/_components/Graph/plugins/plugin-help'

type callBackFn = (change: SVGElement) => void

export class DblclickPlugin extends PluginHelp {
  PluginCss = '__plugin-dblclick'
  private selectionChangeCallbacks: callBackFn[] = []

  registerWorkflow(workflow: Workflow): void {
    super.registerWorkflow(workflow)
    this.addSvgEventListener('dblclick', this.onDblClick)
  }

  onDblClick(event: Event): void {
    const element = this.getEventElement(event)
    if (element !== undefined) {
      this.emitChange(element)
    }
  }

  /**
   * 注册双击事件
   * @param callback 回调事件
   * @param type {string?} 可选参数，只处理特定的类型的双击事件
   */
  registerOnDblClick(callback: callBackFn, type?: SVG_TYPE): void {
    const fn = type
      ? (change: SVGElement) => {
          // 判断类型和需要的类型是否一致
          if (DblclickPlugin.isType(change, type as SVG_TYPE)) {
            callback(change)
          }
        }
      : callback
    this.selectionChangeCallbacks.push(fn)
  }

  private emitChange(change: SVGElement): void {
    for (const fn of this.selectionChangeCallbacks) {
      fn(change)
    }
  }
}
