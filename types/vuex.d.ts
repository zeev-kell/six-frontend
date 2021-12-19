import '@nuxt/types'
import { Auth } from '@nuxtjs/auth-next'
import { ApiType } from '@/types/plugin'

declare module 'vuex/types/index' {
  interface Store<S> {
    $auth: Auth
    $api: ApiType
  }
}
