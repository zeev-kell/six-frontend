import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'
import { Workflow } from 'cwlts/mappings/v1.0'

export interface CaseModel {
  title: string
  provider: string
  category: { id: string; name: string }[]
  content: CaseContent
  description: string
  resource_id: string
  type: number
  name: string
  create_at: string
  updated_at: string
  instruction: string
  status: number
  readme: string
}

export interface CaseContent {
  version: string
  workflow: CommandLineTool | Workflow
  input: any
  source: string
}
