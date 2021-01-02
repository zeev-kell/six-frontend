import { TokenKey } from '../utils/local-storage'

export default function ({ store, route, req, redirect }) {
  const isServer = process.server
  const token = store.state[TokenKey]
  const path = isServer ? req.originalUrl : route.path
  const redirectURL = path ? '/login?ref=' + encodeURIComponent(path) : '/login'
  // 需要进行权限判断的页面开头
  if (!token) {
    redirect(redirectURL)
  }
}
