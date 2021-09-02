import { CommandLineBindingModel, ParameterTypeModel, ExpressionModel } from 'cwlts/models'

export function commandParameterType(type: ParameterTypeModel): string {
  try {
    let output: string = type.type
    const nullable = type.isNullable ? '?' : ''
    if (output === undefined) {
      return 'n/a'
    }
    if (type.isItemOrArray) {
      return `${output}${nullable}, Array<${output}>${nullable}`
    }
    if (type.type === 'array') {
      output = `Array<${type.items}>`
    }
    return output + nullable
  } catch (ex) {
    return 'n/a'
  }
}

export function CommandInputBindingPipe(inputBinding: CommandLineBindingModel): string {
  if (!inputBinding) {
    return 'unbound'
  }
  if (inputBinding.prefix) {
    return inputBinding.prefix
  }
  if (inputBinding.position) {
    return `pos: ${inputBinding.position}`
  }
  return 'pos: 0'
}

export function commandOutputGlob(glob: ExpressionModel | string[]): string {
  if (glob instanceof ExpressionModel) {
    if (glob.serialize() === undefined) {
      return 'n/a'
    }
    return glob.toString()
  }

  return 'n/a'
}
