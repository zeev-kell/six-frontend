import { TokenKey, setStore } from '@/utils/local-storage'

export default {
  // 用户信息记录
  RECORD_USER_INFO(state, token) {
    state.token = token
    state[TokenKey] = token.token
    setStore('token', token)
  },
  SET_BODY_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
}
