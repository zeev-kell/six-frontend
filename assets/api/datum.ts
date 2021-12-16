import { MESSAGE_SUCCESS, MESSAGE_ERROR } from '@/utils/reponse-helper'
import { datumConstants } from '@/constants/DatumConstants'
import BaseModule from '@/assets/api/BaseModule'
import { tableResponse } from '@/types/table'
import { DatumModel } from '@/types/model/Datum'

export class Module extends BaseModule {
  create(data: any): Promise<any> {
    return this.$axios.$post('/v2/data', data)
  }
  removeVersion(resourceId: string) {
    return this.$axios
      .$delete('/v2/data/' + resourceId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  getOssToken(): Promise<any> {
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
  addFile(resourceId: string, data: any): any {
    return this.$axios.$post(`/v2/data/${resourceId}/file`, data)
  }
  deleteFile(resourceId: string, data: any[]): any {
    return this.$axios.$delete(`/v2/data/${resourceId}/file`, { data }).then(MESSAGE_SUCCESS).catch(MESSAGE_ERROR)
  }
  // eslint-disable-next-line camelcase
  updateFile(resourceId: string, data: any): any {
    return this.$axios.$put(`/v2/data/${resourceId}/file`, data)
  }
  getFile(resourceId: string, fileId: string): any {
    return this.$axios.$get(`/v2/data/${resourceId}/file/${fileId}`)
  }

  update(dataId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/data/repository/' + dataId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  updateVersion(resourceId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/data/' + resourceId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(resourceId: string): Promise<any> {
    // return this.$axios.$get('/v2/data/' + 'b2effdab-173f-40ac-8a0f-e70374217fa5')
    return this.$axios.$get('/v2/data/' + resourceId)
  }
  getList(params?: any): Promise<any[]> {
    return this.$axios.$get<any[]>('/v2/datas', { params })
  }
  getFormatList(): Promise<any> {
    return this.$axios.$get<any[]>('/v2/datas', {
      params: {
        type: datumConstants.items.TYPE_FORMAT,
      },
    })
  }
  search(params?: any): Promise<any> {
    console.log(params)
    return this.$axios.$get<tableResponse<DatumModel>>('/v1/search/data', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
