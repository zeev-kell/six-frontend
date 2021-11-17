export interface DatumModel {
  data_id: string
  resource_id: string
  name: string
  data_name: string
  version: string
  provider: string
  create_at: number
  description: string
  category: string
  download: string
  tutorial: string
  type: number
  website: string
  status: number
  versions: DatumModel[]
  Readme: any
  readme: any
  content: any
  link_pipes: string
}

export interface DatumItemModel {
  id: string
  path: string
  name: string
  mediatype: string
  bytes: number
  hash: string
  schema: string
  description: string
  encoding: string
  saveMode: string
}
