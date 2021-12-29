import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { PipeModel } from '@/types/model/Pipe'
import { MESSAGE_SUCCESS, MESSAGE_ERROR } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/response'
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

  update(id: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/repository/' + id, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  updateVersion(resourceId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/' + resourceId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(id: string): Promise<any> {
    return this.$axios.$get('/v2/pipe/repository/' + id)
  }
  getList(params?: any): Promise<PipeModel[]> {
    return this.$axios
      .$get<PipeModel[]>('/v2/pipes', { params })
      .then((response) => {
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
      .catch(() => [])
  }
  getSummary(params?: any): Promise<PipeModel[]> {
    return this.$axios.$get<PipeModel[]>('/v2/pipes/summary', { params })
  }
  getVersion(resourceId: string): Promise<PipeModel> {
    return this.$axios.$get('/v2/pipe/' + resourceId)
  }

  search(params?: any): Promise<tableResponse<PipeModel>> {
    console.log(params)
    return this.$axios.$get<tableResponse<PipeModel>>('/v1/search/pipe', { params })
  }

  // 应用版本处理api
  getRevision(pipeId: string, resourceId: string): Promise<any> {
    return this.$axios
      .$get('/v2/pipe/repository/' + pipeId + '/revision/' + resourceId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  createRevision(pipeId: string, data: any): Promise<any> {
    return this.$axios
      .$post('/v2/pipe/repository/' + pipeId + '/revision', data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  updateRevision(pipeId: string, resourceId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/repository/' + pipeId + '/revision/' + resourceId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  deleteRevision(pipeId: string, resourceId: string): Promise<any> {
    return this.$axios
      .$delete('/v2/pipe/repository/' + pipeId + '/revision/' + resourceId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  // 应用仓库处理api
  getRepository(pipeId: string): Promise<any> {
    return this.$axios
      .$get('/v2/pipe/repository/' + pipeId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  createRepository(data: any): Promise<any> {
    return this.$axios.$post('/v2/pipe/repository', data).then(MESSAGE_SUCCESS).catch(MESSAGE_ERROR)
  }
  updateRepository(pipeId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/repository/' + pipeId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  deleteRepository(pipeId: string): Promise<any> {
    return this.$axios
      .$delete('/v2/pipe/repository/' + pipeId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  // 获取应用详情
  getPipe(resourceId: string): Promise<any> {
    return this.$axios
      .$delete('/v2/pipe/' + resourceId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
}

export type ModuleType = InstanceType<typeof Module>
