import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'
import type { ModuleType as PipeType } from '~/assets/api/pipe'

declare module 'vue/types/vue' {
  interface Vue {
    $$axios: NuxtAxiosInstance
    $I18nRouter: VueRouter
    __i18nMixin__: boolean
    $api: {
      pipe: PipeType
    }
  }
}
