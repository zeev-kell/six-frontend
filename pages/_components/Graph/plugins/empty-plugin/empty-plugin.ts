import { PluginHelp } from '@/pages/_components/Graph/plugins/plugin-help'
import './empty-plugin.scss'

export class EmptyPlugin extends PluginHelp {
  PluginCss = '__plugin-empty'
  private css = {
    empty: '__plugin-is-empty',
  }

  afterRender(): void {
    this.toRenderIfEmpty()
  }

  afterModelChange(): void {
    this.workflow.model.on('step.create', () => {
      this.svg.classList.remove(this.css.empty)
    })
    this.workflow.model.on('step.remove', this.toRenderIfEmpty.bind(this))
  }

  private toRenderIfEmpty(): void {
    const steps = this.workflow.model.steps
    if (steps && steps.length > 0) {
      this.svg.classList.remove(this.css.empty)
    } else {
      this.svg.classList.add(this.css.empty)
    }
  }
}
