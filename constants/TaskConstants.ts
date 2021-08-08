import BaseConstants from '@/constants/BaseConstants_'
import { Items } from '@/types/constant'
const items: Items = {
  STATUS_DRAFT: '0', // 草稿
  STATUS_OFF: '1', // 禁用
  STATUS_ON: '2', // 启用
}
export const taskConstants = new BaseConstants(items)
