import 'nuxt-property-decorator'
import 'vue/types/vue'
import { MessageBoxData } from 'element-ui/types/message-box'
import { ElMessage, ElMessageComponent, ElMessageOptions } from 'element-ui/types/message'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'
import { IVueI18nNuxt, NuxtI18nInstance } from 'nuxt-i18n'

interface $ElMessage extends ElMessage {
  (text: string, type?: string): ElMessageComponent
  (options?: ElMessageOptions, type?: string): ElMessageComponent
  success(text?: string): ElMessageComponent
  warning(text?: string): ElMessageComponent
  info(text?: string): ElMessageComponent
  error(text?: string): ElMessageComponent
}

interface VueMethod {
  created(): Promise<any> | void
  beforeMount(): Promise<any> | void
  mounted(): Promise<any> | void
  beforeDestroy(): Promise<any> | void

  __i18n_mixin__: boolean
  $moment: any
  $$confirm: (message: string, title?: string, type?: string) => Promise<MessageBoxData>
  $$message: $ElMessage
  $$axios: NuxtAxiosInstance
  $I18nRouter: VueRouter
  $i18n: IVueI18nNuxt
}

declare module 'nuxt-property-decorator' {
  interface Vue extends VueMethod {}
  interface VueConstructor extends VueMethod {
    $options: any
  }
}

declare module 'vue/types/vue' {
  interface Vue extends VueMethod {}
  interface VueConstructor extends VueMethod {
    $options: any
  }
}
