import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  getTags(params?: any): Promise<any> {
    return this.$axios.$get<any>('/v1/tags', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
