<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { WorkflowFactory } from 'cwlts/models'
import { Workflow } from 'cwl-svg'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import { WorkflowModel } from 'cwlts/models/generic/WorkflowModel'
import { Generator } from '@/pages/_components/Graph/Generator'
import GraphMixin from './GraphMixin.vue'

@Component
export default class GraphWorkflow extends GraphMixin {
  dataModel!: WorkflowModel

  recreateModel(json: V1Workflow): void {
    this.dataModel = WorkflowFactory.from(json, 'document')
    // 要使用 SVGArrangePlugin 插件，必须要有 sbg 前缀，可以改地址
    if (!this.dataModel.namespaces.has('sbg')) {
      this.dataModel.namespaces.set('sbg', 'https://www.sevenbridges.com/')
    }
    this.dataModel.setValidationCallback(this.afterModelValidation.bind(this))
    this.dataModel.validate().then(this.afterModelValidation.bind(this))
  }
  createModel(json: V1Workflow | null | 'null'): void {
    if (json === null || json === 'null') {
      json = Generator.generateWorkflow()
    }
    this.recreateModel(json as V1Workflow)
    this.afterModelCreated()
    const plugins = this.getDefaultPlugins()
    this.graph = new Workflow({
      editingEnabled: !this.readonly,
      model: this.dataModel,
      svgRoot: this.$refs.svg,
      plugins,
    })
  }
}
</script>
