/**
 * 双击选择插件，需要在 SelectionPlugin 下优化样式
 * Created by keziyuan on 2021/2/5 22:58.
 */

import { PluginBase } from 'cwl-svg'

export class DblclickPlugin extends PluginBase {
  static edgePortsDelimiter = '$!$'
  static css = '__plugin-dblclick'
  cleanups = []
  selectionChangeCallbacks = []

  registerWorkflow(workflow) {
    super.registerWorkflow(workflow)
    this.svg = this.workflow.svgRoot
    this.svg.classList.add(DblclickPlugin.css)
    const clickListener = this.onDblClick.bind(this)
    this.svg.addEventListener('dblclick', clickListener)
    this.cleanups.push(() => this.svg.removeEventListener('click', clickListener))
  }

  onDblClick(event) {
    const target = event.target
    let element

    if ((element = this.workflow.findParent(target, 'node'))) {
      this.emitChange(element)
    } else if ((element = this.workflow.findParent(target, 'edge'))) {
      const cid = [
        element.getAttribute('data-source-connection'),
        DblclickPlugin.edgePortsDelimiter,
        element.getAttribute('data-destination-connection'),
      ].join('')
      this.emitChange(cid)
    }
  }

  destroy() {
    for (const fn of this.cleanups) {
      fn()
    }
  }

  registerOnDblClick(fn) {
    this.selectionChangeCallbacks.push(fn)
  }

  emitChange(change) {
    for (const fn of this.selectionChangeCallbacks) {
      fn(change)
    }
  }
}
