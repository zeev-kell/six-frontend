import { CategoryModel } from '@/types/model/Common'

export interface PipeModel {
  pipe_id: string
  resource_id: string
  name: string
  pipe_name: string
  version: string
  provider: string
  create_at: number
  description: string
  category: CategoryModel[]
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

export interface PipeRepositoryModel {
  pipe_id: string
  resource_id: string

  name: string
  type: number
  provider: string

  latest_rev: string
  create_at: number
  description: string
  category: CategoryModel[]

  website: string
  status: number
  versions: PipeModel[]
  readme: any
}
