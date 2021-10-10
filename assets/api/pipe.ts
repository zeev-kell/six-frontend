// 增加处理异常的 message 提示
import Element from 'element-ui'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { PipeModel } from '@/types/model/Pipe'

export class Module {
  private $axios: NuxtAxiosInstance

  constructor({ $axios }: Context) {
    this.$axios = $axios
  }

  create(data: any): Promise<any> {
    if (typeof data.content !== 'string') {
      data.content = JSON.stringify(data.content)
    }
    return this.$axios.$post('/v2/pipe', data)
  }

  get(pipeId: string) {
    return this.$axios.$get('/v2/pipe/repository/' + pipeId)
  }

  getListV2(params: any): Promise<PipeModel[]> {
    return this.$axios.$get<PipeModel[]>('/v2/pipes', { params }).then((response) => {
      response.forEach((r) => {
        if (r.content) {
          r.content = getObject(r.content)
        }
        r.versions?.forEach((v) => {
          if (v.content) {
            v.content = getObject(v.content)
          }
        })
      })
      return response
    })
  }

  update(pipeId: string, data: any) {
    return this.$axios.$put('/v2/pipe/repository/' + pipeId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }

  getVersion(versionId: string) {
    return this.$axios.$get('/v2/pipe/' + versionId)
  }

  updateVersion(versionId: string, data: any) {
    return this.$axios.$put('/v2/pipe/' + versionId, data).then((response) => {
      Element.Message.success('保存成功')
      return response
    })
  }
}

export type ModuleType = InstanceType<typeof Module>
