export interface tableQuery {
  page: number
  size: number
  term?: string
  [key: string]: number | string | undefined
}

export interface tableResponse<T> {
  page: number
  size: number
  count: number
  data: T[]
}

export interface tableData<T> {
  count: number
  rows: T[]
  totalPage: number
}
