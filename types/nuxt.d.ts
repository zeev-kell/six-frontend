import '@nuxt/types'
import { IVueI18nNuxt } from 'nuxt-i18n'

declare module '@nuxt/types' {
  interface Context {
    i18n: IVueI18nNuxt
  }
}
