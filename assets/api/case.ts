import { CaseModel } from '@/types/model/Case'
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/table'
import BaseModule from '@/assets/api/BaseModule'

export class Module extends BaseModule {
  create(data: any): Promise<any> {
    return this.$axios.$post('/v1/case', data)
  }
  update(id: string, data: any): Promise<any> {
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

  search(params?: any): Promise<tableResponse<CaseModel>> {
    console.log(params)
    return this.$axios.$get<tableResponse<CaseModel>>('/v1/search/case', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
