import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import Element from 'element-ui'

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
    return this.$axios.$get<any[]>('/v2/datas', { params })
  }

  getOssToken() {
    return this.$axios.$get('/v1/osstoken').then((response) => response.data)
  }

  updateVersion(versionId: string, data: any) {
    return this.$axios.$put('/v2/datum/' + versionId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }
}

export type ModuleType = InstanceType<typeof Module>
