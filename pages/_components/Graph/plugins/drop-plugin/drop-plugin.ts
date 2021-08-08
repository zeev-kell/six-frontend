/**
 * 拖拽 插件，只处理拖拽之后的位置
 */

import { Workflow } from 'cwl-svg'
import { PluginHelp } from '@/pages/_components/Graph/plugins/plugin-help'
import { fnChange } from '../plugin'
import './drop-plugin.scss'

export class DropPlugin extends PluginHelp {
  PluginCss = '__plugin-drop'
  private css = {
    dragging: '__plugin-dragging',
  }

  registerWorkflow(workflow: Workflow): void {
    super.registerWorkflow(workflow)

    this.addSvgEventListener('drop', this.onDrop as EventListener)
    this.addSvgEventListener('dragenter', this.onDragenter as EventListener)
    this.addSvgEventListener('dragover', this.onDragover as EventListener)
    this.addSvgEventListener('dragleave', this.onDragLeave as EventListener)
  }

  private onDragenter(event: DragEvent): void {
    this.svg.classList.add(this.css.dragging)
    event.preventDefault()
  }

  private onDragover(event: DragEvent): void {
    this.svg.classList.add(this.css.dragging)
    event.preventDefault()
  }

  private onDragLeave(event: DragEvent): void {
    this.svg.classList.remove(this.css.dragging)
    event.preventDefault()
  }

  private onDrop(event: DragEvent): void {
    this.svg.classList.remove(this.css.dragging)
    const coords = this.workflow.transformScreenCTMtoCanvas(event.clientX, event.clientY)
    // 把位置传出去
    this.onDropAfterChange(coords)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  private onDropAfterChange = (patched: { x: number; y: number } = { x: 0, y: 0 }): void => {}

  registerOnDropAfterChange(fn: fnChange): void {
    this.onDropAfterChange = function (patched: { x: number; y: number } = { x: 0, y: 0 }): void {
      fn(patched)
    }
  }
}
