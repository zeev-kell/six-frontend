import { Auth } from '@nuxtjs/auth-next'
import 'vuex/types'

declare module 'vuex/types/index' {
  interface Store {
    $auth: Auth
  }
}
