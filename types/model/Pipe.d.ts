export interface PipeModel {
  pipe_id: string
  resource_id: string
  name: string
  pipe_name: string
  version: string
  provider: string
  create_at: number
  description: string
  category: string | string[]
  download: string
  tutorial: string
  type: number
  cwl: string
  website: string
  profile: string
  status: number
  versions: PipeModel[]
  readme: any
  content: any
}
