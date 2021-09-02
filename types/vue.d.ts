import 'nuxt-property-decorator'
import 'vue/types/vue'
import { MessageBoxData } from 'element-ui/types/message-box'
import { ElMessage } from 'element-ui/types/message'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import VueRouter from 'vue-router'
import { NuxtI18nInstance } from 'nuxt-i18n'

interface $ElMessage extends ElMessage {}

interface VueMethod {
  created(): Promise<any> | void
  beforeMount(): Promise<any> | void
  mounted(): Promise<any> | void
  beforeDestroy(): Promise<any> | void

  __i18nMixin__: boolean
  $moment: any
  $$confirm: (message: string, title?: string, type?: string) => Promise<MessageBoxData>
  $$message: $ElMessage
  $$axios: NuxtAxiosInstance
  $I18nRouter: VueRouter
  $i18n: NuxtI18nInstance
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
