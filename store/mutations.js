import { TokenKey, setStore, removeStore, removeToken } from '@/utils/local-storage'

export default {
  // 用户信息记录
  RECORD_USER_INFO(state, token) {
    state.token = token
    state[TokenKey] = token.token
    setStore('token', token)
  },
  // 清理用户信息
  CLEAR_USER_INFO(state, isServer) {
    state.token = undefined
    state[TokenKey] = undefined
    removeToken()
    if (!isServer) {
      removeStore('token')
    }
  },
  SET_BODY_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
}
