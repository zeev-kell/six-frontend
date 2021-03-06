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
  async getList(params?: any): Promise<PipeModel[]> {
    params = Object.assign({ page: 1, size: 1000, term: '' }, params)
    const response = await this.$axios.$get<tableResponse<PipeModel>>('/v2/pipes/search', { params })
    return response.data
  }
  getSummary(params?: any): Promise<PipeModel[]> {
    return this.$axios.$get<PipeModel[]>('/v2/pipes/summary', { params })
  }
  getVersion(resourceId: string): Promise<PipeModel> {
    return this.$axios.$get('/v2/pipe/' + resourceId)
  }

  search(params?: any): Promise<tableResponse<PipeModel>> {
    console.log(params)
    params = Object.assign({ term: ``, page: 1, size: 20 }, params)
    return this.$axios.$get<tableResponse<PipeModel>>('/v1/search/pipe', { params })
  }

  // 应用版本处理api
  getRevision(pipeId: string, resourceId: string): Promise<any> {
    return this.$axios.$get('/v2/pipe/repository/' + pipeId + '/revision/' + resourceId)
  }
  createRevision(pipeId: string, data: any): Promise<any> {
    return this.$axios.$post('/v2/pipe/repository/' + pipeId + '/revision', data)
  }
  updateRevision(pipeId: string, resourceId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/repository/' + pipeId + '/revision/' + resourceId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  deleteRevision(pipeId: string, resourceId: string): Promise<any> {
    return this.$axios.$delete('/v2/pipe/repository/' + pipeId + '/revision/' + resourceId)
  }

  // 应用仓库处理api
  getRepository(pipeId: string): Promise<any> {
    return this.$axios.$get('/v2/pipe/repository/' + pipeId)
  }
  createRepository(data: any): Promise<any> {
    return this.$axios.$post('/v2/pipe/repository', data)
  }
  updateRepository(pipeId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v2/pipe/repository/' + pipeId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  deleteRepository(pipeId: string): Promise<any> {
    return this.$axios.$delete('/v2/pipe/repository/' + pipeId)
  }
}

export type ModuleType = InstanceType<typeof Module>
