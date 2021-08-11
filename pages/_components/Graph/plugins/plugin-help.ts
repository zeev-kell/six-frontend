/**
 * 基本的插件助手
 *
 */

import { PluginBase, Workflow } from 'cwl-svg'

export type SVG_TYPE = 'step' | 'node' | 'edge' | 'input' | 'output'

export abstract class PluginHelp extends PluginBase {
  abstract PluginCss: string
  protected svg!: SVGGElement
  protected cleanups: Array<() => void> = []

  // 注册绑定事件
  registerWorkflow(workflow: Workflow): void {
    super.registerWorkflow(workflow)
    this.svg = this.workflow.svgRoot
    this.svg.classList.add(this.PluginCss)
  }

  // 销毁清除所有事件
  destroy(): void {
    for (const fn of this.cleanups) {
      fn()
    }
    this.svg.classList.remove(this.PluginCss)
  }

  /**
   * 增加 svg 的事件监听
   * @param type 监听事件的类型
   * @param fn   监听回调
   */
  addSvgEventListener(type: string, fn: EventListener): void {
    const eventListener = fn.bind(this)
    this.svg.addEventListener(type, eventListener)
    this.cleanups.push(() => this.svg.removeEventListener(type, eventListener))
  }

  // 获取事件中触发的节点或者线条
  getEventElement(event: Event): SVGElement | undefined {
    const target = event.target
    if (target === null) {
      return
    }
    return this.workflow.findParent(target as Element, 'node') || this.workflow.findParent(target as Element, 'edge')
  }

  // 判断是否是输入节点
  static isInput(element: SVGElement): boolean {
    return element.classList.contains('input')
  }

  // 判断是否是输出节点
  static isOutput(element: SVGElement): boolean {
    return element.classList.contains('output')
  }

  // 判断是否是连线
  static isEdge(element: SVGElement): boolean {
    return element.classList.contains('edge')
  }

  // 判断是否是节点
  static isNode(element: SVGElement): boolean {
    return element.classList.contains('node')
  }

  // 判断是否是指定的类型
  static isType(element: SVGElement, type: SVG_TYPE): boolean {
    return element.classList.contains(type)
  }
}
