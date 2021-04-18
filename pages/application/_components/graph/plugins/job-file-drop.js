import { PluginBase } from 'cwl-svg'
import { AppHelper } from '../helpers/AppHelper'
import './job-file-drop.scss'

export class SVGJobFileDropPlugin extends PluginBase {
  svg
  fileInputs = {}
  css = {
    plugin: '__plugin-job-file-drop',
    added: '__plugin-job-file-drop-added',
  }

  registerWorkflow(workflow) {
    super.registerWorkflow(workflow)
    this.svg = this.workflow.svgRoot
    this.svg.classList.add(this.css.plugin)
  }

  destroy() {
    this.svg.classList.remove(this.css.plugin)
  }

  afterRender() {
    this.renderNodeLabels()
  }

  renderNodeLabels() {
    const fileInputNodeLabels = this.workflow.workflow.querySelectorAll('.input.type-File .title.label')
    for (const txtEl of fileInputNodeLabels) {
      this.createLabelTSpanElements(txtEl)
    }
    const arrayFileInputNodeLabels = this.workflow.workflow.querySelectorAll(
      '.input.type-array.items-File .title.label'
    )
    for (const txtEl of arrayFileInputNodeLabels) {
      this.createLabelTSpanElements(txtEl)
    }
  }

  createLabelTSpanElements(txtEl) {
    const idText = txtEl.textContent
    txtEl.textContent = ''
    const id = document.createElementNS(this.svg.namespaceURI, 'tspan')
    id.setAttribute('x', '0')
    id.textContent = idText
    txtEl.appendChild(id)

    const fileLabel = document.createElementNS(this.svg.namespaceURI, 'tspan')
    fileLabel.classList.add('file-label')
    fileLabel.setAttribute('x', '0')
    fileLabel.setAttribute('dy', '15')
    fileLabel.textContent = 'No file added'
    txtEl.appendChild(fileLabel)
  }

  updateToJobState(job = {}) {
    const fileInputsSelector = '.input.type-File'
    const fileArrayInputsSelector = '.input.type-array.items-File'
    // Find all input nodes that represent files or file arrays
    const query = this.svg.querySelectorAll([fileInputsSelector, fileArrayInputsSelector].join())
    for (const node of query) {
      const inputID = node.getAttribute('data-id')
      if (!job[inputID]) {
        this.updateNodeLabel(node, undefined)
        continue
      }
      const filePaths = []
      for (const entry of [].concat(job[inputID])) {
        if (entry === null) {
          continue
        }
        if ((entry.class === 'File' || entry.class === 'Directory') && entry.path) {
          filePaths.push(entry.path)
        }
      }
      this.updateNodeLabel(node, filePaths)
    }
  }

  updateNodeLabel(node, values) {
    const label = node.querySelector(`.title .file-label`)
    const typeIsArray = node.classList.contains('type-array')
    if (!node || !label) {
      return
    }
    if (values) {
      if (values.length > 1) {
        label.textContent = `Added ${values.length} files`
      } else if (values.length === 1) {
        label.textContent = AppHelper.getBasename(values[0])
      } else if (values.length === 0 && typeIsArray) {
        label.textContent = 'Empty array'
      } else {
        label.textContent = 'No file added'
      }
    } else if (typeIsArray) {
      label.textContent = 'No files added'
    } else {
      label.textContent = 'No file added'
    }
  }
}
