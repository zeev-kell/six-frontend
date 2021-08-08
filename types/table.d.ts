export interface tableQuery {
  page: number
  size: number
  [key: string]: number | string | undefined
}

export interface tableData<T> {
  count: number
  rows: T[]
  totalPage: number
}

export interface tableResponse<T> {
  code: 'success' | 'error'
  data: tableData<T>
}
