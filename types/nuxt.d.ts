import '@nuxt/types'
import { NuxtI18nInstance } from 'nuxt-i18n'

declare module '@nuxt/types' {
  interface Context {
    i18n: NuxtI18nInstance
  }
}
