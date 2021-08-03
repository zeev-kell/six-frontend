import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $$axios: NuxtAxiosInstance
    $api: {
      pipe: any
    }
    $I18nRouter: VueRouter
  }
}
