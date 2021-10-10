import BaseConstants from '@/constants/BaseConstants'
import { Record } from '@/types/constant'
const items: Record = {
  TYPE_FORMAT: 0, // 格式
  TYPE_DATA: 1, // 数据
  TYPE_DATA_PACKAGE: 2, // 数据包
}

export const datumConstants = new BaseConstants(items)
