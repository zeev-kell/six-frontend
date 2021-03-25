import { TokenKey, setToken, removeToken } from '@/utils/local-storage'

export default {
  // 用户信息记录
  RECORD_USER_INFO(state, token) {
    state.token = token
    state[TokenKey] = token.token
    setToken(token.token)
  },
  // 清理用户信息
  CLEAR_USER_INFO(state) {
    state.token = undefined
    setToken(undefined)
    removeToken()
  },
  SET_BODY_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
}
