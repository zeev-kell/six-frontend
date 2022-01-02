import BaseConstants from '@/constants/BaseConstants'
import { Record } from '@/types/constant'
const items: Record = {
  STATUS_DRAFT: '0', // 草稿
  STATUS_OFF: '1', // 禁用
  STATUS_ON: '2', // 启用

  TYPE_TOOL: 0, // 工具
  TYPE_APP: 1, // 流程
  // TYPE_DOCKER: 2, // docker
  // TYPE_WORK: 3, // 工作
  // TYPE_WORKFLOW: 4, // 工作流
}

export const pipeConstants = new BaseConstants(items)
export const PIPE_LOCAL = 'graph-content'
