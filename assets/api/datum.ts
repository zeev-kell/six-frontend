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
    // return this.$axios.$get('/v2/data/' + 'b2effdab-173f-40ac-8a0f-e70374217fa5')
    return this.$axios.$get('/v2/data/' + resourceId)
  }

  getList(params?: any): Promise<any[]> {
    return this.$axios.$get<any[]>('/v2/datas', { params })
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

  // eslint-disable-next-line camelcase
  addFile(resourceId: string, data: { id: string; oss_tag: 0 | 1; content: any }) {
    return this.$axios.$post(`/v2/data/${resourceId}/file`, data)
  }

  update(dataId: string, data: any) {
    return this.$axios.$put('/v2/data/repository/' + dataId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }

  updateVersion(versionId: string, data: any) {
    return this.$axios.$put('/v2/data/' + versionId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }
}

export type ModuleType = InstanceType<typeof Module>
