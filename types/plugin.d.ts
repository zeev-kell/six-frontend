import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'
import type { ModuleType as PipeType } from '~/assets/api/pipe'
import type { ModuleType as UserType } from '~/assets/api/user'
import type { ModuleType as DatumType } from '~/assets/api/datum'
import type { ModuleType as BlogType } from '~/assets/api/blog'

export interface ApiType {
  pipe: PipeType
  user: UserType
  datum: DatumType
  blog: BlogType
}

declare module 'vue/types/vue' {
  interface Vue {
    __i18nMixin__: boolean
    $$axios: NuxtAxiosInstance
    $I18nRouter: VueRouter
    $api: ApiType
  }
}
