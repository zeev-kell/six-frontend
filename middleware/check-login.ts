import { Middleware } from '@nuxt/types'

const CheckLoginMiddleware: Middleware = ({ store, redirect, query, app }) => {
  if (store.$auth?.loggedIn) {
    // const ref = new RegExp('(^|[&?])ref=([^&]*)(&|$)', 'i')
    const redirectURL = query.ref || app.localePath('/application')
    redirect(301, { path: redirectURL as string })
  }
}

export default CheckLoginMiddleware
