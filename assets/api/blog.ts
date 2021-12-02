import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { BlogModel } from '@/types/model/Blog'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  get(id: string): Promise<BlogModel> {
    console.log(`/v1/blog/${id}`)
    return this.$axios.$get<BlogModel>(`/v1/blog/${id}`)
  }
}

export type ModuleType = InstanceType<typeof Module>
