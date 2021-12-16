// 增加处理异常的 message 提示
import Element from 'element-ui'
import BaseModule from '@/assets/api/BaseModule'

export class Module extends BaseModule {
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
  getPipes(): any {
    return this.$axios.$get('/v1/user/pipes')
  }
  getDocs(): any {
    return this.$axios.$get('/v1/user/blogs')
  }
}

export type ModuleType = InstanceType<typeof Module>
