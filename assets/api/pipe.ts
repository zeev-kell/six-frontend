import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { PipeModel } from '@/types/model/Pipe'
import { MESSAGE_SUCCESS, MESSAGE_ERROR } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/table'
import BaseModule from '@/assets/api/BaseModule'

export class Module extends BaseModule {
  create(data: any): Promise<any> {
    if (typeof data.content !== 'string') {
      data.content = JSON.stringify(data.content)
    }
    return this.$axios.$post('/v2/pipe', data)
  }

  removeVersion(resourceId: string): Promise<any> {
    return this.$axios
      .$delete('/v2/pipe/' + resourceId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  update(pipeId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/repository/' + pipeId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  updateVersion(resourceId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/' + resourceId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(pipeId: string): Promise<any> {
    return this.$axios.$get('/v2/pipe/repository/' + pipeId)
  }
  getList(params?: any): Promise<PipeModel[]> {
    return this.$axios.$get<PipeModel[]>('/v2/pipes', { params }).then((response) => {
      response.forEach((r) => {
        if (r.content) {
          r.content = getObject(r.content)
        }
        r.versions?.forEach((v) => {
          if (v.content) {
            v.content = getObject(v.content)
          }
        })
      })
      return response
    })
  }
  getVersion(resourceId: string): Promise<PipeModel> {
    return this.$axios.$get('/v2/pipe/' + resourceId)
  }

  search(params?: any): Promise<tableResponse<PipeModel>> {
    console.log(params)
    return this.$axios.$get<tableResponse<PipeModel>>('/v1/search/pipe', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
