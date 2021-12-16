import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'

export default class BaseModule {
  protected $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }
}
