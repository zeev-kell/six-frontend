import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { BlogModel } from '@/types/model/Blog'
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '@/utils/reponse-helper'
import { tableResponse } from '@/types/table'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }
  create(data: any): Promise<any> {
    return this.$axios.$post('/v1/blog', data)
  }
  update(blogId: string, data: any): Promise<any> {
    return this.$axios
      .$put('/v1/blog/' + blogId, data)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }
  remove(blogId: string): Promise<any> {
    return this.$axios
      .$delete('/v1/blog/' + blogId)
      .then(MESSAGE_SUCCESS)
      .catch(MESSAGE_ERROR)
  }

  get(blogId: string): Promise<BlogModel> {
    return this.$axios.$get<BlogModel>(`/v1/blog/${blogId}`)
  }
  getList(params?: any): Promise<BlogModel[]> {
    return this.$axios.$get<BlogModel[]>('/v1/blogs', { params })
  }

  search(params?: any): Promise<tableResponse<BlogModel>> {
    return this.$axios.$get<tableResponse<BlogModel>>('/v1/search/doc', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
