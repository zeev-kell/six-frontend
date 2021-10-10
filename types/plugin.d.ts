import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'
import type { ModuleType as PipeType } from '~/assets/api/pipe'
import type { ModuleType as UserType } from '~/assets/api/user'
import type { ModuleType as DatumType } from '~/assets/api/datum'

declare module 'vue/types/vue' {
  interface Vue {
    __i18nMixin__: boolean
    $$axios: NuxtAxiosInstance
    $I18nRouter: VueRouter
    $api: {
      pipe: PipeType
      user: UserType
      datum: DatumType
    }
  }
}
