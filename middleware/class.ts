import { Middleware } from '@nuxt/types'

const ClassMiddleware: Middleware = ({ store, route }) => {
  store.commit('system/SET_BODY_CLASS', route.name)
}

export default ClassMiddleware
