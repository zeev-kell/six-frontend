import BaseConstants from '@/constants/BaseConstants'
import { Record } from '@/types/constant'
const items: Record = {
  TYPE_WIKI: 0, // wiki
  TYPE_COURSE: 1, // 教程
  TYPE_ARTICLE: 2, // 文章
}

export const blogConstants = new BaseConstants(items)
