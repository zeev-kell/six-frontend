import { Component, mixins, ProvideReactive } from 'nuxt-property-decorator'
import { GraphEdit } from '@/pages/_components/Graph/GraphEdit'
import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'
import { CommandInputParameterModel, CommandLineToolFactory, CommandLineToolModel } from 'cwlts/models'
import GraphExpressionEvaluator from '@/pages/_components/Graph/GraphExpressionEvaluator.vue'

@Component({
  data() {
    return {
      dataModel: null,
    }
  },
})
export default class GraphMixinTool extends mixins<GraphEdit>(GraphEdit, GraphExpressionEvaluator) {
  @ProvideReactive('model')
  dataModel!: CommandLineToolModel

  recreateModel(json: string | CommandLineTool): void {
    if (typeof json === 'string') {
      json = JSON.parse(json) as CommandLineTool
    }
    this.dataModel = CommandLineToolFactory.from(json, 'document')
    if (!this.dataModel.namespaces.has('sbg')) {
      this.dataModel.namespaces.set('sbg', 'https://www.sevenbridges.com/')
    }
    this.dataModel.onCommandLineResult(this.onCommandLineResult)
    this.dataModel.updateCommandLine()
    this.dataModel.setValidationCallback(this.afterModelValidation.bind(this))
    this.dataModel.validate().then(this.afterModelValidation.bind(this))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterModelCreated(isFirstCreation: boolean): void {
    this.dataModel.on('input.create', (input: CommandInputParameterModel) => {
      console.log('input.create', input)
    })
    this.dataModel.on('input.remove', (input: CommandInputParameterModel) => {
      console.log('input.remove', input)
    })
    this.dataModel.on('input.change.id', (data: { oldId: string; newId: string; port: CommandInputParameterModel }) => {
      const { oldId, newId, port } = data
      console.log('input.change.id', oldId, newId, port)
    })
  }
}
