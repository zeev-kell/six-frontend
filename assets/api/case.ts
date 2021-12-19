import { CaseModel } from '@/types/model/Case'
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/table'
import BaseModule from '@/assets/api/BaseModule'

function serialize(data: any): any {
  data = Object.assign({}, data)
  if (data.content && typeof data.content !== 'string') {
    data.content = JSON.stringify(data.content)
  }
  if (Array.isArray(data.category)) {
    data.category = data.category.map((c: any) => (typeof c === 'string' ? c : c.name)).join(',')
  }
  return data
}

export class Module extends BaseModule {
  create(data: any): Promise<any> {
    data = serialize(data)
    return this.$axios.$post('/v1/case', data)
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
  getList(params?: any): Promise<tableResponse<CaseModel>> {
    console.log(params)
    return this.$axios.$get<tableResponse<CaseModel>>('/v1/cases', { params })
  }

  search(params?: any): Promise<tableResponse<CaseModel>> {
    console.log(params)
    return this.$axios.$get<tableResponse<CaseModel>>('/v1/search/case', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>