import { PluginBase } from 'cwl-svg'
import './required-input-markup.scss'

export class SVGRequiredInputMarkup extends PluginBase {
  svg
  css = {
    plugin: '__plugin-required-input-markup',
    required: '__plugin-required-input-markup-required',
  }

  registerWorkflow(workflow) {
    super.registerWorkflow(workflow)
    this.svg = this.workflow.svgRoot
    this.svg.classList.add(this.css.plugin)
  }

  destroy() {
    this.svg.classList.remove(this.css.plugin)
  }

  markMissing(...nodeIDs) {
    const allInputs = this.workflow.workflow.querySelectorAll(`.node.input`)
    for (const inputEl of allInputs) {
      const id = inputEl.getAttribute('data-connection-id')
      if (~nodeIDs.indexOf(id)) {
        inputEl.classList.add(this.css.required)
      } else {
        inputEl.classList.remove(this.css.required)
      }
    }
  }
}
