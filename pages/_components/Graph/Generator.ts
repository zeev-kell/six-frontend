// 关于 $namespaces https://www.commonwl.org/v1.0/SchemaSalad.html
import { CommandLineTool, Workflow } from 'cwlts/mappings/v1.0'
import { taskConstants } from '@/constants/TaskConstants'

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

  static generateTask(id?: string, label?: string): CommandLineTool {
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

// 创建新的一个新的task
// status 可以直接创建一个对应 status 的 task
export function createMyTask(task?: any): any {
  return {
    name: '',
    status: task?.status ?? taskConstants.items.STATUS_DRAFT,
    content: Generator.generateTask(),
  }
}
