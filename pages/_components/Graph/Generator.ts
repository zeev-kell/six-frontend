// 关于 $namespaces https://www.commonwl.org/v1.0/SchemaSalad.html
import { CommandLineTool, Workflow } from 'cwlts/mappings/v1.0'

export class Generator {
  static generateWorkflow(id?: string, label?: string): Workflow {
    return {
      $namespaces: {
        sbg: 'https://www.sevenbridges.com/',
      },
      id,
      label,
      cwlVersion: 'v1.0',
      class: 'Workflow',
      inputs: [],
      outputs: [],
      steps: [],
      doc: '',
    } as Workflow
  }

  static generateTool(id?: string, label?: string): CommandLineTool {
    return {
      $namespaces: {
        sbg: 'https://www.sevenbridges.com/',
      },
      id,
      label,
      cwlVersion: 'v1.0',
      class: 'CommandLineTool',
      inputs: [],
      outputs: [],
      baseCommand: '',
      doc: '',
    } as CommandLineTool
  }
}
