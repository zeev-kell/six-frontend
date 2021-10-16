import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  create(data: any): Promise<any> {
    return this.$axios.$post('/v2/data', data)
  }

  get(resourceId: string) {
    return this.$axios.$get('/v2/data/' + resourceId)
  }

  getList(params?: any): Promise<any[]> {
    return this.$axios.$get<any[]>('/v1/datas', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
