import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { BlogModel } from '@/types/model/Blog'
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '@/utils/reponse-helper'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'

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
  get(id: string): Promise<BlogModel> {
    return this.$axios.$get<BlogModel>(`/v1/blog/${id}`)
  }

  getList(params?: any): Promise<BlogModel[]> {
    return this.$axios.$get<BlogModel[]>('/v1/blogs', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
