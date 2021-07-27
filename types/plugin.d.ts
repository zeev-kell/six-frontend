import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $$axios: NuxtAxiosInstance
    $I18nRouter: VueRouter
    __i18nMixin__: boolean
  }
}
