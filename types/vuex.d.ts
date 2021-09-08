import '@nuxt/types'
import { Auth } from '@nuxtjs/auth-next'
import { ModuleType as PipeType } from '@/assets/api/pipe'
import { ModuleType as UserType } from '@/assets/api/user'

declare module 'vuex/types/index' {
  interface Store<S> {
    $auth: Auth
    $api: {
      pipe: PipeType
      user: UserType
    }
  }
}
