import { CaseModel } from '@/types/model/Case'
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/response'
import BaseModule from '@/assets/api/BaseModule'

function serialize(data: any): any {
  data = Object.assign({}, data)
  if (data.content && typeof data.content !== 'string') {
    data.content = JSON.stringify(data.content)
  }
  return data
}

export class Module extends BaseModule {
  create(data: any): Promise<any> {
    data = serialize(data)
    return this.$axios.$post('/v1/case', data).catch(MESSAGE_ERROR)
  }
  update(id: string, data: any): Promise<any> {
    data = serialize(data)
    return this.$axios
      .$put('/v1/case/' + id, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  remove(id: string): Promise<any> {
    return this.$axios
      .$delete('/v1/case/' + id)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(id: string): Promise<CaseModel> {
    return this.$axios.$get<CaseModel>(`/v1/case/${id}`)
  }
  async getList(params?: any): Promise<CaseModel[]> {
    params = Object.assign({ page: 1, size: 1000, term: '' }, params)
    const response = await this.$axios.$get<tableResponse<CaseModel>>('/v1/search/case', { params })
    return response.data
  }

  search(params?: any): Promise<tableResponse<CaseModel>> {
    console.log(params)
    params = Object.assign({ term: ``, page: 1, size: 20 }, params)
    return this.$axios.$get<tableResponse<CaseModel>>('/v1/search/case', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
