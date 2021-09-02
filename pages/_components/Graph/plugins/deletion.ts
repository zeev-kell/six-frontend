import { SelectionPlugin, PluginBase } from 'cwl-svg'
import { StepModel, WorkflowInputParameterModel, WorkflowOutputParameterModel } from 'cwlts/models'

export class DeletionPlugin extends PluginBase {
  private boundDeleteFunction = this.onDelete.bind(this)

  afterRender(): void {
    this.attachDeleteBehavior()
  }

  onEditableStateChange(enable: boolean): void {
    if (enable) {
      this.attachDeleteBehavior()
    } else {
      this.detachDeleteBehavior()
    }
  }

  private attachDeleteBehavior(): void {
    this.detachDeleteBehavior()
    window.addEventListener('keyup', this.boundDeleteFunction, true)
  }

  private detachDeleteBehavior(): void {
    window.removeEventListener('keyup', this.boundDeleteFunction, true)
  }

  private onDelete(ev: KeyboardEvent): void {
    console.log(ev)
    // TODO 目前浏览器对 svg 的聚焦是无效的
    // if ((ev.which !== 8 && ev.which !== 46) || !(ev.target instanceof SVGElement)) {
    if (ev.which !== 8 && ev.which !== 46) {
      return
    }

    this.deleteSelection()
  }

  public deleteSelection(): void {
    const selection = this.workflow.getPlugin(SelectionPlugin)

    if (!selection || !this.workflow.editingEnabled) {
      return
    }

    const selected = selection.getSelection()
    selected.forEach((type, id) => {
      if (type === 'node') {
        const model = this.workflow.model.findById(id)

        if (model instanceof StepModel) {
          this.workflow.model.removeStep(model)
          selection.clearSelection()
        } else if (model instanceof WorkflowInputParameterModel) {
          this.workflow.model.removeInput(model)
          selection.clearSelection()
        } else if (model instanceof WorkflowOutputParameterModel) {
          // FIXME 删除输出节点时候，会清除没有连线的输入节点
          this.workflow.model.removeOutput(model)
          selection.clearSelection()
        }
      } else {
        const [source, destination] = id.split(SelectionPlugin.edgePortsDelimiter)
        this.workflow.model.disconnect(source, destination)
        selection.clearSelection()
      }
    })
  }

  destroy(): void {
    this.detachDeleteBehavior()
  }
}
