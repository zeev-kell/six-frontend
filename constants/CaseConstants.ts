import BaseConstants from '@/constants/BaseConstants'
import { Record } from '@/types/constant'
const items: Record = {
  TYPE_CWLC: 0, // cwlc文件
  TYPE_JUPYTER: 1, // jupyter notebook
  TYPE_RSTUDIO: 2, // Rstudio notebook
}

export const caseConstants = new BaseConstants(items)
