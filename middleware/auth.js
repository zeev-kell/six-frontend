import { TokenKey } from '../utils/local-storage'

const loginPath = '/login'
const whiteList = [loginPath, '/register']

export default function ({ store, route, req, redirect }) {
  const isServer = process.server
  const path = isServer ? req.originalUrl : route.path
  if (!whiteList.some((w) => path.startsWith(w))) {
    // const redirectURL = path ? loginPath + '?ref=' + encodeURIComponent(path) : loginPath
    const token = store.state[TokenKey]
    // 需要进行权限判断的页面开头
    if (!token) {
      // redirect(redirectURL)
    }
  }
}
