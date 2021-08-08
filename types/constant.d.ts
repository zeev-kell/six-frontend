// 目前只有 string 类型
export type MapKey = string

export interface Items {
  STATUS_DRAFT: MapKey
  STATUS_OFF: MapKey
  STATUS_ON: MapKey
  [index: string]: MapKey
}
