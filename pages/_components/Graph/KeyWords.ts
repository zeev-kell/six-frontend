import { getNextAvailableId, CommandLineToolModel, WorkflowModel } from 'cwlts/models'

export const KEY_WORDS = ['workflow', 'input', 'output', 'task', 'call', 'command', 'as', 'runtime', 'parameter_meta', 'scatter', 'meta']

export function checkKeyWord(value: string, dataModel: CommandLineToolModel | WorkflowModel): void {
  if (value.startsWith('_')) {
    throw new Error(`Key "${value}" can't start with "_"`)
  }
  if (!/^[0-9a-zA-Z_]+$/.test(value)) {
    throw new Error(`Key "${value}" is not consisting of letters, numbers, or underscores`)
  }
  const index = KEY_WORDS.indexOf(value)
  if (index !== -1) {
    const nextId = getNextAvailableId(`${value}_1`, (dataModel.inputs as any).concat(dataModel.outputs))
    throw new Error(`Key "${value}" is a Reserved word, the next available id is "${nextId}"`)
  }
}
