/* eslint-disable camelcase */
import { MutationTree } from 'vuex'

export const state = () => ({
  bodyClass: '',
  isMobile: false,
  dragToolItem: undefined,
})

export type SystemState = ReturnType<typeof state>

export const mutations: MutationTree<SystemState> = {
  SET_BODY_CLASS(state, bodyClass): void {
    state.bodyClass = bodyClass
  },
  SET_HELP_MENUS(state): void {
    state.isMobile = true
  },
  // 修改当前拖拽的对象
  SET_DRAG_TOOL_ITEM(state: SystemState, item?) {
    state.dragToolItem = item
  },
}
