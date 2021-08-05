import { NuxtState } from '@nuxt/types/app'

export interface RootState extends NuxtState {
  bodyClass: string
  helpMenus: string[]
  isMobile: boolean
}
