<template>
  <div class="graph h-100 el-row el-row--flex">
    <transition name="el-fade-in-linear">
      <tool-list-box></tool-list-box>
    </transition>
    <div class="h-100 el-col-full p-r">
      <svg ref="svg" class="cwl-workflow h-100" />
      <tool-box :graph="graph" :tools="tools" :validation-state="validationState" @toolbox-event="propagateEvent" />
    </div>
    <transition name="el-fade-in-linear">
      <workflow-step-inspector ref="stepInspector" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, ProvideReactive, Watch } from 'vue-property-decorator'
import { Workflow as V1Workflow } from 'cwlts/mappings/v1.0/Workflow'
import {
  SelectionPlugin,
  SVGArrangePlugin,
  SVGEdgeHoverPlugin,
  SVGNodeMovePlugin,
  SVGPortDragPlugin,
  SVGValidatePlugin,
  Workflow,
  ZoomPlugin,
  DeletionPlugin,
} from 'cwl-svg'
import { DropPlugin } from '@/pages/_components/Graph/plugins/drop-plugin/drop-plugin'
import { EmptyPlugin } from '@/pages/_components/Graph/plugins/empty-plugin/empty-plugin'
import { DblclickPlugin } from '@/pages/_components/Graph/plugins/dblclick-plugin'
import { MenuPlugin } from '@/pages/_components/Graph/plugins/menu-plugin/menu-plugin'
import { GraphEvent } from '@/constants/GraphEvent'
import { GraphEdit } from '@/pages/_components/Graph/GraphEdit'
import { CommandLineToolModel, WorkflowModel } from 'cwlts/models'
import WorkflowStepInspector from '@/pages/_components/Graph/components/WorkflowStepInspector.vue'
import { V1WorkflowModel } from 'cwlts/models/v1.0'
import { getObject } from '@/pages/application/_components/graph/helpers/YamlHandle'
import ToolListBox from '@/pages/_components/Graph/components/ToolListBox.vue'
import { GraphPlugin } from './types'
import ToolBox from './components/ToolBox.vue'

@Component({
  components: {
    ToolListBox,
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
  @ProvideReactive('model')
  dataModel!: CommandLineToolModel | WorkflowModel
  @Prop({ required: true })
  readonly content!: V1Workflow
  @Prop({ default: false })
  readonly readonly!: boolean
  @Prop({ default: undefined })
  readonly tools!: string
  @Prop({
    default() {
      return []
    },
  })
  readonly plugins!: GraphPlugin[]
  // graph 必须初始化值
  @ProvideReactive('graph')
  graph!: Workflow

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
        new DblclickPlugin(),
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

  // 让图形聚焦
  @Provide('setFocusOnCanvas')
  setFocusOnCanvas(): void {
    // TODO 目前浏览器对 svg 的聚焦是无效的
    // 影响删除的按键操作
    this.$refs.svg.focus()
  }

  addInputToGraph(inputParam: any): void {
    const model = this.dataModel as V1WorkflowModel
    ;(model as V1WorkflowModel).addInput(inputParam.content, model.inputs.length)
    const input = model.inputs[model.inputs.length - 1]
    // 这里暂时没有找到别的替代方法，直接使用了 protected 方法，这 ts 中是不允许的
    ;(this.dataModel as any).addInputToGraph(input)
    ;(this.dataModel as any).eventHub.emit('input.create', input)
    this.graph.draw(model)
  }

  addNodeToGraph(task: any, coords: { x: number; y: number }): void {
    // sbg 前缀是必须的
    Object.assign(task.content, {
      'sbg:x': coords.x,
      'sbg:y': coords.y,
      'ztron:id': task.id,
    })
    if (task._isInput) {
      // 创建输入节点
      this.addInputToGraph(task)
    } else {
      this.addStepToGraph(task)
    }
  }

  // 往图形添加 step
  addStepToGraph(task: any): void {
    const { content, name } = task
    if (content.id === undefined && content.label === undefined) {
      content.id = name
    }
    const step = this.graph.model.addStepFromProcess(content)
    this.setFocusOnCanvas()
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
    this.$emit('propagate-event', ...args)
  }

  beforeDestroy(): void {
    // 销毁流程图
    this.graph.destroy()
  }

  mounted(): void {
    // 处理 yaml 格式为 json 格式
    const content = getObject(this.content)
    this.createModel(content as any)
    this.fixWheel()
    if (!this.readonly) {
      // 注册拖拽放置事件
      const drop = this.graph.getPlugin(DropPlugin)
      drop?.registerOnDropAfterChange((coords: SVGPoint) => {
        const task = this.$store.state.system.dragToolItem
        this.addNodeToGraph(task, coords)
      })
      // 注册双击事件，只处理 step 的类型
      const dblclick = this.graph.getPlugin(DblclickPlugin)
      dblclick?.registerOnDblClick((element: SVGElement): void => {
        const selectionNode = this.graph.model.steps.find((input) => input.id === element.getAttribute('data-id'))
        if (selectionNode) {
          this.$refs.stepInspector.showDialog(selectionNode)
          // this.propagateEvent(GraphEvent.TriggerEdit, element, selectionNode, this.dataModel)
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
      // 触发回调 add step 事件
      this.$on(GraphEvent.CallAddStep, (task: any) => {
        this.addNodeToGraph(task, {
          x: Math.floor(Math.random() * 100 + 20),
          y: Math.floor(Math.random() * 100 + 20),
        })
      })
    }
    // 初次进入自动放缩 并且 调整排版
    this.$nextTick(() => {
      this.graph.getPlugin(SVGArrangePlugin)?.arrange()
    })
  }
}
</script>
