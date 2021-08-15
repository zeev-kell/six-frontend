import { Component, ProvideReactive } from 'nuxt-property-decorator'
import { GraphEdit } from '@/pages/_components/Graph/GraphEdit'
import { WorkflowFactory, WorkflowModel } from 'cwlts/models'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'

@Component({
  data() {
    return {
      dataModel: null,
    }
  },
})
export default class GraphMixinWorkflow extends GraphEdit {
  @ProvideReactive('model')
  dataModel!: WorkflowModel

  recreateModel(json: string | V1Workflow): void {
    if (typeof json === 'string') {
      json = JSON.parse(json) as V1Workflow
    }
    this.dataModel = WorkflowFactory.from(json, 'document')
    // 要使用 SVGArrangePlugin 插件，必须要有 sbg 前缀，可以改地址
    if (!this.dataModel.namespaces.has('sbg')) {
      this.dataModel.namespaces.set('sbg', 'https://www.sevenbridges.com/')
    }
    this.dataModel.setValidationCallback(this.afterModelValidation.bind(this))
    this.dataModel.validate().then(this.afterModelValidation.bind(this))
  }
}
