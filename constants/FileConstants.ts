import BaseConstants from '@/constants/BaseConstants'
import { Record } from '@/types/constant'
// TODO 修改为数字
const items: Record = {
  STATUS_READING: 'reading',
  STATUS_PENDING: 'pending',
  STATUS_UPLOADING: 'uploading',
  STATUS_PROGRESS: 'progress',
  STATUS_SUCCESS: 'success',
  STATUS_ERROR: 'error',
  STATUS_RETRY: 'retry',
  STATUS_REFUSE: 'refuse',
}

export const fileConstants = new BaseConstants(items)
