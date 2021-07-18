import { Auth } from '@nuxtjs/auth-next/dist'

export interface RootState {
  bodyClass: string
  helpMenus: string[]
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface Store<S> {
    $auth: Auth
  }
}
