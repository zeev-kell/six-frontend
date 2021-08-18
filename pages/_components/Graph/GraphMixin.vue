<template>
  <div class="graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" />
      <tool-box :tools="tools" :validation-state="validationState" @tool-event="toolEvent" />
    </div>
    <transition name="el-fade-in-linear">
      <workflow-step-inspector ref="stepInspector" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, ProvideReactive, Watch } from 'nuxt-property-decorator'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import {
  DeletionPlugin,
  SelectionPlugin,
  SVGArrangePlugin,
  SVGEdgeHoverPlugin,
  SVGNodeMovePlugin,
  SVGPortDragPlugin,
  SVGValidatePlugin,
  Workflow,
  ZoomPlugin,
} from 'cwl-svg'
import { SVGJobFileDropPlugin } from '@/pages/application/_components/graph/plugins/job-file-drop'
import { DropPlugin } from '@/pages/_components/Graph/plugins/drop-plugin/drop-plugin'
import { EmptyPlugin } from '@/pages/_components/Graph/plugins/empty-plugin/empty-plugin'
import { DblclickPlugin_ } from '@/pages/_components/Graph/plugins/dblclick-plugin_'
import { MenuPlugin } from '@/pages/_components/Graph/plugins/menu-plugin/menu-plugin'
import { GraphEvent } from '@/constants/GraphEvent'
import { GraphEdit } from '@/pages/_components/Graph/GraphEdit'
import { CommandLineToolModel, WorkflowModel } from 'cwlts/models'
import WorkflowStepInspector from '@/pages/_components/Graph/components/WorkflowStepInspector.vue'
import { getObject, stringifyObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { PipeModel } from '@/types/model/Pipe'
import { downloadBlobLink, downloadStrLink } from '@/utils/download-link'
import JSZip from 'jszip'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import { GraphPlugin } from './types'
import ToolBox from './components/ToolBox.vue'

@Component({
  components: {
    WorkflowStepInspector,
    ToolBox,
  },
  data() {
    return {
      graph: null,
      dataModel: null,
    }
  },
})
export default class GraphMixin extends GraphEdit {
  $refs!: {
    svg: SVGSVGElement
    stepInspector: WorkflowStepInspector
  }

  @ProvideReactive('graph')
  graph!: Workflow
  @ProvideReactive('model')
  dataModel!: CommandLineToolModel | WorkflowModel

  @Prop({ required: true })
  content!: V1Workflow
  @Prop({ default: false })
  readonly!: boolean
  @Prop({ default: undefined })
  tools!: string
  @Prop({
    default() {
      return []
    },
  })
  plugins!: GraphPlugin[]
  @Prop({
    default() {
      return 'download'
    },
  })
  name!: string

  @Watch('graph')
  onGraphChange(): void {
    this.$emit('graph-changed', this.graph)
  }

  // 获取默认的插件
  getDefaultPlugins(): GraphPlugin[] {
    // 默认可以放缩，选择节点，线条悬浮，自动放缩
    const plugins: GraphPlugin[] = [new SVGArrangePlugin(), new SVGEdgeHoverPlugin(), new SelectionPlugin()]
    if (!this.readonly) {
      plugins.push(
        new ZoomPlugin(),
        new SVGPortDragPlugin(),
        new SVGNodeMovePlugin(),
        new SVGValidatePlugin(),
        new DeletionPlugin(),
        new DropPlugin(),
        new DblclickPlugin_(),
        new MenuPlugin(),
        new EmptyPlugin()
      )
    }
    return plugins
  }
  // 修改滚动轮
  fixWheel(): void {
    // 修改滚动的鼠标事件
    this.$refs.svg.addEventListener(
      'wheel',
      (event: Event) => {
        event.preventDefault()
      },
      true
    )
  }
  addNodeToGraph(task: PipeModel, coords: { x: number; y: number }): void {
    // sbg 前缀是必须的
    Object.assign(task.content, {
      'sbg:x': coords.x,
      'sbg:y': coords.y,
      'six:id': task.pipe_id,
    })
    try {
      this.addStepToGraph(task)
    } catch (e: unknown) {
      this.$message.error('软件内容不规范')
      throw e
    }
  }
  // 往图形添加 step
  addStepToGraph(task: PipeModel): void {
    const { content, name } = task
    if (content.id === undefined && content.label === undefined) {
      content.id = name
    }
    const step = this.graph.model.addStepFromProcess(content)
    const selection = this.graph.getPlugin(SelectionPlugin)
    selection?.clearSelection()
    selection?.selectStep(step?.id as string)
  }
  // 获取 model 的 serialize
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSerialize(): any {
    if (this.dataModel instanceof WorkflowModel) {
      return this.dataModel.serializeEmbedded(false)
    }
  }
  // 事件转发到父组件
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propagateEvent(...args: any[]): void {
    this.$emit(GraphEvent.Propagate, ...args)
  }
  // 导出数据
  exportCwl(format = 'yaml', isOnlyData = false): void | { data: any; name: string } {
    const asYaml = format === 'yaml'
    const serialize = this.dataModel instanceof WorkflowModel ? this.dataModel.serializeEmbedded() : this.dataModel.serialize()
    const data = stringifyObject(serialize, asYaml)
    const name = this.name + `.${asYaml ? 'cwl' : format}`
    if (isOnlyData) {
      return { data, name }
    }
    downloadStrLink(data, name)
  }
  // 导出任务数据
  exportJob(format = 'yaml', isOnlyData = false): void | { data: any; name: string } {
    const data = stringifyObject(this.jobControl.value, format === 'yaml')
    const name = this.name + `.job.${format}`
    if (isOnlyData) {
      return { data, name }
    }
    downloadStrLink(data, name)
  }
  // TODO 图型变化时更新 json
  updateJob(jobObject = {}): void {
    const controlValue = this.normalizeJob(jobObject)
    this.jobControl.setValue(controlValue)
    this.graph.getPlugin(SVGJobFileDropPlugin)?.updateToJobState(controlValue)
  }
  normalizeJob(jobObject): any {
    const nullJob = JobHelper.getNullJobInputs(this.graph.model)
    const job = jobObject || {}
    for (const key of Object.keys(job)) {
      // eslint-disable-next-line no-prototype-builtins
      if (!nullJob.hasOwnProperty(key)) {
        delete job[key]
      }
    }
    return { ...nullJob, ...job }
  }

  // 工具事件
  toolEvent(eventName: string, ...args: any[]): void {
    ;(this as any)[eventName](...args)
  }
  async [GraphEvent.TriggerDownload](dType: string, dMain: boolean, dJob: boolean): void {
    if (dMain && !dJob) {
      // 只导出 cwl文件
      this.exportCwl(dType)
    } else if (!dMain && dJob) {
      this.exportJob(dType)
    } else {
      const job: any = this.exportJob(dType, true)
      const main: any = this.exportCwl(dType, true)
      const JSZipModule = await import('jszip')
      // eslint-disable-next-line new-cap
      const zip: JSZip = new JSZipModule.default()
      zip.file(main.name, main.data)
      zip.file(job.name, job.data)
      const content = await zip.generateAsync({ type: 'blob' })
      const name = main.name.split('.')[0]
      downloadBlobLink(content, name + '.zip')
    }
  }

  beforeDestroy(): void {
    // 销毁流程图
    this.graph?.destroy()
  }
  mounted(): void {
    // 处理 yaml 格式为 json 格式
    const content = getObject(this.content)
    this.createModel(content as any)
    // 默认更新 json
    this.updateJob({})
    this.fixWheel()
    if (!this.readonly) {
      // 注册拖拽放置事件
      const drop = this.graph.getPlugin(DropPlugin)
      drop?.registerOnDropAfterChange((coords: SVGPoint) => {
        const task = this.$store.state.system.dragToolItem
        this.addNodeToGraph(task, coords)
      })
      // 注册双击事件，只处理 step 的类型
      const dblclick = this.graph.getPlugin(DblclickPlugin_)
      dblclick?.registerOnDblClick((element: SVGElement): void => {
        const selectionNode = this.graph.model.steps.find((input) => input.id === element.getAttribute('data-id'))
        if (selectionNode) {
          // this.$refs.stepInspector.showDialog(selectionNode)
        }
      }, 'step')
      // 注册菜单事件
      const menu = this.graph.getPlugin(MenuPlugin)
      menu?.registerOnMenuClick((type: string, event: Event) => {
        if (type === 'edit') {
          dblclick?.onDblClick(event)
        } else if (type === 'view') {
          dblclick?.onDblClick(event)
        }
      })
    }
    // 初次进入自动放缩 并且 调整排版
    this.$nextTick(() => {
      this.graph.getPlugin(SVGArrangePlugin)?.arrange()
    })
  }
}
</script>
