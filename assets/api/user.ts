// 增加处理异常的 message 提示
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import Element from 'element-ui'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  getInfo(): any {
    return this.$axios.$get(`/v1/user/profile`)
  }
  updateInfo(data: any): any {
    return this.$axios.$put(`/v1/user/profile`, data)
  }
  getTokenList(): any {
    return this.$axios.$get(`/v1/user/token/personal`)
  }
  createToken(data: any): any {
    return this.$axios.$post(`/v1/user/token/personal`, data)
  }
  updatePassword(data: any): any {
    return this.$axios.$put(`/v1/user/security`, data).catch((response) => {
      Element.Message.error(response?.msg)
      return Promise.reject(response)
    })
  }
  removeToken(tokenId: string): any {
    return this.$axios.$delete(`/v1/user/token/personal/${tokenId}`)
  }
}

export type ModuleType = InstanceType<typeof Module>
