/* eslint-disable camelcase */
import type { MutationTree } from 'vuex'
import { NuxtState } from '@nuxt/types/app'

export const state = (): NuxtState => ({
  bodyClass: '',
  isMobile: false,
  dragToolItem: undefined,
  popoverTime: 0,
  tableTime: 0,
})

export type SystemState = ReturnType<typeof state>

export const mutations: MutationTree<SystemState> = {
  SET_BODY_CLASS(state, bodyClass): void {
    state.bodyClass = bodyClass
  },
  SET_MOBILE(state): void {
    state.isMobile = true
  },
  // 修改当前拖拽的对象
  SET_DRAG_TOOL_ITEM(state: SystemState, item?) {
    state.dragToolItem = item
  },
  // 关闭 popover 提示
  SET_POPOVER_TIME(state: SystemState) {
    state.popoverTime++
  },
  // 刷新当前表格（只适用于当前页面只有一个表格）
  SET_TABLE_TIME(state: SystemState) {
    state.tableTime++
  },
}
