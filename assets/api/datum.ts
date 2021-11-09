import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import { MESSAGE_SUCCESS, MESSAGE_ERROR } from '@/utils/reponse-helper'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  create(data: any): Promise<any> {
    return this.$axios.$post('/v2/data', data)
  }

  removeVersion(resourceId: string) {
    return this.$axios
      .$delete('/v2/data/' + resourceId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  getOssToken() {
    return this.$axios.$get('/v1/osstoken').then((response) => {
      const token = response.data
      token.region = token.Region?.split('.')[0] || 'oss-cn-zhangjiakou'
      token.bucket = token.Bucket || 'sixoclock'
      token.ossPath = token.ossdir.split('/')[1] + '/'
      token.callbackUrl = process.env.BROWSER_BASE_URL!.replace('/api', '') + token.callbackUrl
      return token
    })
  }
  getFormatList(): Promise<any> {
    return this.$axios.$get('/v1/osstoken')
  }

  // eslint-disable-next-line camelcase
  addFile(resourceId: string, data: { id: string; oss_tag: 0 | 1; content: any }) {
    return this.$axios.$post(`/v2/data/${resourceId}/file`, data)
  }
  deleteFile(resourceId: string, data: any[]) {
    return this.$axios.$delete(`/v2/data/${resourceId}/file`, { data }).then(MESSAGE_SUCCESS).catch(MESSAGE_ERROR)
  }

  update(dataId: string, data: any) {
    return this.$axios
      .$put('/v2/data/repository/' + dataId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  updateVersion(resourceId: string, data: any) {
    return this.$axios
      .$put('/v2/data/' + resourceId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(resourceId: string) {
    // return this.$axios.$get('/v2/data/' + 'b2effdab-173f-40ac-8a0f-e70374217fa5')
    return this.$axios.$get('/v2/data/' + resourceId)
  }
  getList(params?: any): Promise<any[]> {
    return this.$axios.$get<any[]>('/v2/datas', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
