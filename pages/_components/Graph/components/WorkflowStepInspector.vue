<template>
  <div v-if="showPanel" class="cwl-params-panel right-panel">
    <div class="card-header">
      <div class="f-b text-truncate" :title="labelName">
        {{ labelName }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close" />
      </button>
    </div>
    <div class="card-body scrollbar">
      <el-tabs v-if="selectionNode" v-model="activeName" type="border-card" style="box-shadow: none">
        <el-tab-pane label="详情" name="info">
          <workflow-step-inspector-info :step="selectionNode"></workflow-step-inspector-info>
        </el-tab-pane>
        <el-tab-pane label="输入" name="input">
          <step-inputs-inspector :step="selectionNode" />
        </el-tab-pane>
        <el-tab-pane label="步骤" name="step">
          <workflow-step-inspector-step :step="selectionNode" />
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        <div>Input Output</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 查看 workflow step 详情
import { Component, InjectReactive } from 'vue-property-decorator'
import { WorkflowModel, StepModel } from 'cwlts/models'
import WorkflowStepInspectorStep from '@/pages/_components/Graph/components/WorkflowStepInspectorStep.vue'
import StepInputsInspector from '@/pages/_components/Graph/components/StepInputsInspector.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import WorkflowStepInspectorInfo from '@/pages/_components/Graph/components/WorkflowStepInspectorInfo.vue'
import InspectorMixins from '@/pages/_components/Graph/components/InspectorMixins'
import { Workflow } from 'cwl-svg'

@Component({
  components: { WorkflowStepInspectorInfo, WorkflowStepInspectorStep, StepInputsInspector, LoadingButton },
  data() {
    return {
      selectionNode: null,
    }
  },
})
export default class WorkflowStepInspector extends InspectorMixins {
  @InjectReactive('model')
  private model!: WorkflowModel
  @InjectReactive('graph')
  private graph!: Workflow

  selectionNode!: StepModel
  activeName = 'input'

  showNodeInfo(selectionNode: StepModel): void {
    if (this.selectionNode?.id !== selectionNode.id) {
      this.selectionNode = selectionNode
      this.activeTabName = 'input'
    }
    this.showPanel = true
  }

  onDblClick(element: string | null): void {
    if (element && typeof element !== 'string') {
      // 选择了节点 node
      const id = element.getAttribute('data-connection-id')
      const selected = this.workflow.model.findById(id)
      this.showNodeInfo(selected)
    }
  }

  resetFields(): void {
    ;(this.selectionNode as any) = null
  }
}
</script>
