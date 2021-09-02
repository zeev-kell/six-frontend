import { Workflow } from 'cwl-svg'

const EdgePortsDelimiter = '$!$'

export function getEventElement(workflow: Workflow, event: Event): undefined | string | SVGElement {
  const target = event.target as Element
  if (target === null) {
    return
  }
  let element
  if ((element = workflow.findParent(target, 'node'))) {
    return element
  } else if ((element = workflow.findParent(target, 'edge'))) {
    return [element.getAttribute('data-source-connection'), EdgePortsDelimiter, element.getAttribute('data-destination-connection')].join('')
  }
}
