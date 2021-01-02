import { setStore } from '@/utils/local-storage'
import { TokenKey } from '../utils/local-storage'

export default {
  // 用户信息记录
  RECORD_USER_INFO(state, token) {
    state.token = token
    state[TokenKey] = token.accessToken
    setStore('token', token)
  },
}
