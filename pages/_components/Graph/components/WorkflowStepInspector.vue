<template>
  <transition name="el-fade-in-linear">
    <div v-if="showPanel" class="right-panel">
      <div class="card-header">
        <div class="f-b text-truncate" :title="labelName">
          {{ labelName }}
        </div>
        <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
          <i class="el-dialog__close el-icon el-icon-close" />
        </button>
      </div>
      <div class="card-body scrollbar">
        <el-tabs v-if="isStep" v-model="activeName">
          <el-tab-pane label="详情" name="info">
            <workflow-step-inspector-info :step="selectionNode" />
          </el-tab-pane>
          <el-tab-pane label="输入" name="input">
            <step-inputs-inspector :step="selectionNode" :readonly="readonly" />
          </el-tab-pane>
          <el-tab-pane label="步骤" name="step">
            <workflow-step-inspector-step :step="selectionNode" :readonly="readonly" />
          </el-tab-pane>
        </el-tabs>
        <div v-else>
          <workflow-io-inspector :step="selectionNode" :readonly="readonly" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// 查看 workflow step 详情
import { Component, InjectReactive } from 'nuxt-property-decorator'
import { WorkflowModel, StepModel, WorkflowInputParameterModel, WorkflowOutputParameterModel } from 'cwlts/models'
import LoadingButton from '@/components/LoadingButton.vue'
import WorkflowStepInspectorStep from '@/pages/_components/Graph/components/WorkflowStepInspectorStep.vue'
import StepInputsInspector from '@/pages/_components/Graph/components/StepInputsInspector.vue'
import WorkflowStepInspectorInfo from '@/pages/_components/Graph/components/WorkflowStepInspectorInfo.vue'
import InspectorMixins from '@/pages/_components/Graph/components/InspectorMixins'
import { SVG_TYPE } from '@/pages/_components/Graph/plugins/plugin-help'
import WorkflowIoInspector from '@/pages/_components/Graph/components/WorkflowIoInspector.vue'

@Component({
  components: { WorkflowIoInspector, WorkflowStepInspectorInfo, WorkflowStepInspectorStep, StepInputsInspector, LoadingButton },
  data() {
    return {
      selectionNode: null,
    }
  },
})
export default class WorkflowStepInspector extends InspectorMixins {
  @InjectReactive('model')
  model!: WorkflowModel

  selectionNode!: StepModel | WorkflowInputParameterModel | WorkflowOutputParameterModel
  activeName = 'input'

  showNodeInfo(selectionNode: StepModel): void {
    if (this.selectionNode?.id !== selectionNode.id) {
      this.selectionNode = selectionNode
      this.activeTabName = 'input'
    }
    this.showPanel = true
  }

  // 注册双击事件，只处理 step 的类型
  onDblClickType: SVG_TYPE = 'node'
  onDblClick(element: SVGElement): void {
    // const selectionNode = this.graph.model.steps.find((input) => input.id === element.getAttribute('data-id'))
    const id = element.getAttribute('data-connection-id') as string
    const selectionNode = this.graph.model.findById(id)
    if (selectionNode) {
      this.showNodeInfo(selectionNode)
    }
  }

  resetFields(): void {
    ;(this.selectionNode as any) = null
  }
}
</script>
