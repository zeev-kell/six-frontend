import { Issue } from 'cwlts/models'

export type GraphPlugin = any

export interface graphTool {
  name?: string
  icon: string
  title: string
  action: string
  eventName?: string
  type?: string
}

export interface graphTools {
  validate: graphTool
  add: graphTool
  auto: graphTool
  plus: graphTool
  minus: graphTool
  fit: graphTool
  [index: string]: graphTool
}

export interface AppValidityState {
  isValidCWL: boolean
  isInvalid?: boolean
  isPending: boolean
  errors: Issue[]
  warnings: Issue[]
}
