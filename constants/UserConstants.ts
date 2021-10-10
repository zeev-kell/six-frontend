import BaseConstants from '@/constants/BaseConstants'
import { Record } from '@/types/constant'
const items: Record = {
  CAN_CREATE: 4, // 草稿
  STATUS_OFF: '1', // 禁用
  STATUS_ON: '2', // 启用
}

export const userConstants = new BaseConstants(items)
