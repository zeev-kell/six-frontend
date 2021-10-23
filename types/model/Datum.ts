export interface DatumModel {
  data_id: string
  resource_id: string
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
  versions: DatumModel[]
  readme: any
  content: any
}
