export interface PipeModel {
  pipe_id: string
  name: string
  pipe_name: string
  version: string
  provider: string
  create_at: number
  description: string
  category: string
  download: string
  tutorial: string
  type: number
  website: string
  status: 16
  versions: PipeModel[]
  readme: any
  resource_id?: string
  content: any
  _expanded: boolean
}
