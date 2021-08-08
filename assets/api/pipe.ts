// 增加处理异常的 message 提示
import Element from 'element-ui'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'

export class Module {
  private $$axios: NuxtAxiosInstance

  constructor({ $$axios }: Context) {
    this.$$axios = $$axios
  }

  get(pipeId: string) {
    return this.$$axios.$get('/v2/pipe/repository/' + pipeId)
  }

  getList() {
    return this.$$axios.$get('/v1/pipes')
  }

  update(pipeId: string, data: any) {
    return this.$$axios.$put('/v2/pipe/repository/' + pipeId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }

  getVersion(versionId: string) {
    return this.$$axios.$get('/v2/pipe/' + versionId)
  }

  updateVersion(versionId: string, data: any) {
    return this.$$axios.$put('/v2/pipe/' + versionId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }
}

export type ModuleType = InstanceType<typeof Module>
