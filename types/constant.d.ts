// 目前只有 string 类型
export type MapKey = string | number

export interface Record {
  [index: string]: MapKey
}

export interface Items extends Record {
  STATUS_DRAFT: MapKey
  STATUS_OFF: MapKey
  STATUS_ON: MapKey

  TYPE_APP: MapKey
  TYPE_DOCKER: MapKey
  TYPE_TOOL: MapKey
  TYPE_WORK: MapKey
  TYPE_WORKFLOW: MapKey
}

export type ItemList = { value: MapKey; label: string }[]
