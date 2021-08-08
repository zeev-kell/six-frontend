import { PluginBase } from 'cwl-svg'
import { WorkflowModel } from 'cwlts/models'

export class HistoryPlugin extends PluginBase {
  private history: WorkflowModel[] = []
  private future: WorkflowModel[] = []

  putInHistory(model: WorkflowModel): void {
    if (this.history.length > 20) {
      this.history.shift()
    }

    this.history.push(model.serializeEmbedded(true))
    this.future.length = 0
  }

  historyUndo(model: WorkflowModel): WorkflowModel | undefined {
    this.future.push(model.serializeEmbedded(true))
    return this.history.pop()
  }

  historyRedo(model: WorkflowModel): WorkflowModel | undefined {
    this.history.push(model.serializeEmbedded(true))
    return this.future.pop()
  }

  canUndo(): boolean {
    return this.history.length > 0
  }

  canRedo(): boolean {
    return this.future.length > 0
  }

  emptyHistory(): void {
    this.history.length = 0
    this.future.length = 0
  }
}
