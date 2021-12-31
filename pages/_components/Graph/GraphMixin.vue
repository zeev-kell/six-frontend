<template>
  <div class="graph h-100 el-row el-row--flex">
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" />
      <tool-box :tools="tools" :validation-state="validationState" @tool-event="toolEvent" />
    </div>
    <editor-job-inspector v-if="isRunJob" />
    <workflow-step-inspector v-else :readonly="readonly" />
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
import { SVGJobFileDropPlugin } from '@/pages/_components/Graph/plugins/job-file-drop/job-file-drop'
import { SVGRequiredInputMarkup } from '@/pages/_components/Graph/plugins/required-input-markup/required-input-markup'
import { DropPlugin } from '@/pages/_components/Graph/plugins/drop-plugin/drop-plugin'
import { EmptyPlugin } from '@/pages/_components/Graph/plugins/empty-plugin/empty-plugin'
import { DblclickPlugin } from '@/pages/_components/Graph/plugins/dblclick-plugin'
import { MenuPlugin } from '@/pages/_components/Graph/plugins/menu-plugin/menu-plugin'
import { GraphEvent } from '@/constants/GraphEvent'
import { GraphEdit } from '@/pages/_components/Graph/GraphEdit'
import { CommandLineToolModel, WorkflowModel } from 'cwlts/models'
import WorkflowStepInspector from '@/pages/_components/Graph/components/WorkflowStepInspector.vue'
import { getObject, stringifyObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { PipeModel } from '@/types/model/Pipe'
import { downloadBlobLink, downloadStrLink } from '@/utils/download-link'
import JSZip from 'jszip'
import { compareStore, setStore } from '@/utils/local-storage'
import { GraphPlugin } from '@/types/graph'
import EditorJobInspector from '@/pages/_components/Graph/components/EditorJobInspector.vue'
import { normalizeJob } from '@/pages/_components/Graph/helpers/JobHelper'
import { Generator } from '@/pages/_components/Graph/Generator'
import { PIPE_LOCAL } from '@/constants/PipeConstants'
import ToolBox from './components/ToolBox.vue'

@Component({
  components: {
    EditorJobInspector,
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
  @Prop({ default: 'params' })
  configType!: string
  @Prop({ default: 'download' })
  name!: string
  @Prop({ default: false })
  isWheel!: boolean

  get isRunJob(): boolean {
    return this.configType === 'run'
  }
  get jobValue(): any {
    return this.$store.state.graph.jobValue
  }

  @Watch('jobValue', { deep: true })
  onWatchJobValue(jobValue: any): void {
    this.graph.getPlugin(SVGJobFileDropPlugin)?.updateToJobState(jobValue)
    const markupPlugin = this.graph.getPlugin(SVGRequiredInputMarkup)
    if (markupPlugin) {
      const missingInputConnectionIDs = this.graph.model.inputs
        .filter((input) => !input.type.isNullable && (jobValue[input.id] === null || jobValue[input.id] === undefined))
        .map((input) => input.connectionId)
      markupPlugin.markMissing(...missingInputConnectionIDs)
    }
  }

  // TODO 图型变化时更新 json
  updateJob(jobObject = {}): void {
    const jobValue = normalizeJob(jobObject, this.graph.model)
    this.$store.commit('graph/SET_JOB_VALUE', jobValue)
  }
  // 获取默认的插件
  getDefaultPlugins(): GraphPlugin[] {
    // 默认可以放缩，选择节点，线条悬浮，自动放缩，双击选择，默认插件
    const plugins: GraphPlugin[] = [new SVGArrangePlugin(), new SVGEdgeHoverPlugin(), new SelectionPlugin(), new DblclickPlugin(), ...this.plugins]
    if (!this.readonly) {
      if (this.isWheel) {
        plugins.push(new ZoomPlugin())
        plugins.push(new EmptyPlugin())
      }
      plugins.push(new SVGPortDragPlugin(), new SVGNodeMovePlugin(), new SVGValidatePlugin(), new DeletionPlugin(), new DropPlugin())
      if (this.isRunJob) {
        plugins.push(new SVGJobFileDropPlugin(), new SVGRequiredInputMarkup())
      } else {
        // 不是运行任务，可以删除
        plugins.push(new MenuPlugin())
      }
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
  // 往图形添加 Node
  addNodeToGraph(task: PipeModel, coords: { x: number; y: number }): void {
    // sbg 前缀是必须的
    Object.assign(task.content, {
      'sbg:x': coords.x,
      'sbg:y': coords.y,
      'six:id': task.resource_id || '',
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
    const data = stringifyObject(this.jobValue, format === 'yaml')
    const name = this.name + `.job.${format}`
    if (isOnlyData) {
      return { data, name }
    }
    downloadStrLink(data, name)
  }
  // 创建图形
  createGraph(content?: V1Workflow): void {
    // 处理 yaml 格式为 json 格式
    content = content ?? getObject(this.content)
    this.createModel(content as any)
    // 默认更新 json
    this.updateJob({})
    if (!this.readonly) {
      // 注册拖拽放置事件
      const drop = this.graph.getPlugin(DropPlugin)
      drop?.registerOnDropAfterChange((coords: SVGPoint) => {
        const task = this.$store.state.system.dragToolItem
        this.addNodeToGraph(JSON.parse(JSON.stringify(task)), coords)
      })
      // 注册双击事件，只处理 step 的类型
      const dblclick = this.graph.getPlugin(DblclickPlugin)
      // 注册菜单事件
      const menu = this.graph.getPlugin(MenuPlugin)
      menu?.registerOnMenuClick((type: string, event: Event) => {
        if (type === 'edit') {
          dblclick?.onDblClick(event)
        } else if (type === 'view') {
          dblclick?.onDblClick(event)
        }
      })
      if (this.isWheel) {
        this.fixWheel()
      }
    }
    this.$nextTick(() => {
      // 初次进入调整视野
      this.graph.fitToViewport()
      // 初次进入自动放缩 并且 调整排版
      // this.graph.getPlugin(SVGArrangePlugin)?.arrange()
    })
  }
  reCreateGraph(content?: V1Workflow): void {
    this.graph.destroy()
    this.createGraph(content)
    this.$store.commit('graph/CLEAN_SELECTION')
  }

  // 工具事件
  toolEvent(eventName: string, ...args: any[]): void {
    ;(this as any)[eventName](...args)
  }
  async [GraphEvent.TriggerGraphDownload](dType: string, dMain: boolean, dJob: boolean): Promise<void> {
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
      const zip: JSZip = new (JSZipModule as any).default()
      zip.file(main.name, main.data)
      zip.file(job.name, job.data)
      const content = await zip.generateAsync({ type: 'blob' })
      const name = main.name.split('.')[0]
      downloadBlobLink(content, name + '.zip')
    }
  }
  [GraphEvent.TriggerGraphSaveContent](): void | boolean {
    const { data: content } = this.exportCwl('json', true) as { data: any }
    const str = JSON.stringify(content)
    // 判断是否和本地存储一致，数据不一致才保存
    if (!compareStore(PIPE_LOCAL, str)) {
      setStore(PIPE_LOCAL, str)
      return true
    }
  }
  [GraphEvent.TriggerGraphEmpty](): void {
    const content = Generator.generateWorkflow()
    this.reCreateGraph(content)
  }

  mounted(): void {
    // 首次插入 content 可能为空，增加一次的监听
    if (this.content) {
      console.log('on content')
      this.createGraph()
    } else {
      const unWatch = this.$watch('content', () => {
        console.info('on watch content')
        this.createGraph()
        unWatch()
      })
    }
    // 监听更新 job 数据
    this.$on(GraphEvent.PayloadUpdateJob, (job: any) => {
      console.log('GraphMixin on update-job', job)
      this.updateJob(job)
    })
  }
  beforeDestroy(): void {
    // 销毁流程图
    this.graph?.destroy()
    this.$off(GraphEvent.PayloadUpdateJob)
  }
}
</script>
