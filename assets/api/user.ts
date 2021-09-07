// 增加处理异常的 message 提示
import { promises } from 'dns'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  createToken(data: any): any {
    return this.$axios.$post(`/v1/user/token/create`, data)
  }

  getTokenList(): any {
    return this.$axios.$get(`/v1/user/token`)
  }

  removeToken(tokenId: string): any {
    return this.$axios.$delete(`/v1/user/${tokenId}`)
  }
}

export type ModuleType = InstanceType<typeof Module>
