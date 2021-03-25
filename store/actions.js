import cookie from 'cookie'
import { TokenKey } from '../utils/local-storage'

const actions = {
  // 初始化用户的信息，only from the server-side
  nuxtServerInit({ commit }, { req, app }) {
    if (req.headers.cookie) {
      const parsedCookies = cookie.parse(req.headers.cookie)
      if (parsedCookies[TokenKey]) {
        // eslint-disable-next-line no-console
        console.log(parsedCookies[TokenKey])
      }
    }
  },
  logout() {
    return this.$auth.logout('/logout')
  },
}
export default actions
