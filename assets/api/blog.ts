import { BlogModel } from '@/types/model/Blog'
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/response'
import BaseModule from '@/assets/api/BaseModule'

export class Module extends BaseModule {
  create(data: any): Promise<any> {
    return this.$axios.$post('/v1/blog', data)
  }
  update(id: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v1/blog/' + id, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  remove(id: string): Promise<any> {
    return this.$axios
      .$delete('/v1/blog/' + id)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(id: string): Promise<BlogModel> {
    return this.$axios.$get<BlogModel>(`/v1/blog/${id}`)
  }
  getList(params?: any): Promise<BlogModel[]> {
    return this.$axios.$get<BlogModel[]>('/v1/blogs', { params })
  }

  search(params?: any): Promise<tableResponse<BlogModel>> {
    console.log(params)
    params = Object.assign({ term: ``, page: 1, size: 20 }, params)
    return this.$axios.$get<tableResponse<BlogModel>>('/v1/search/doc', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
