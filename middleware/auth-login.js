import { TokenKey } from '../utils/local-storage'

export default function ({ store, query, redirect }) {
  if (query.notAuthorized === 'true') {
    return
  }
  const token = store.state[TokenKey]
  // 如果用户已经登录，跳转到重定向地址或者 application 页面
  if (token) {
    // const ref = new RegExp('(^|[&?])ref=([^&]*)(&|$)', 'i')
    const redirectURL = query.ref || '/application'
    redirect(301, redirectURL)
  }
}
