import '@nuxt/types'
import { NuxtI18nInstance } from 'nuxt-i18n'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '@nuxt/types' {
  interface Context {
    i18n: NuxtI18nInstance
    $$axios: NuxtAxiosInstance
  }
}
