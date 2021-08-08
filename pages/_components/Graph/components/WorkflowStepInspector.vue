<template>
  <el-dialog :title="dialogTitle" width="60%" :visible.sync="dialogVisible" :append-to-body="true">
    <el-tabs v-if="selectionNode" v-model="activeName" type="border-card" style="box-shadow: none">
      <!-- <el-tab-pane label="Info" name="info">
        <workflow-step-inspector-info :step="selectionNode"></workflow-step-inspector-info>
      </el-tab-pane> -->
      <el-tab-pane :label="$t('graph.input')" name="input">
        <step-inputs-inspector :step="selectionNode" />
      </el-tab-pane>
      <el-tab-pane :label="$t('graph.step')" name="step">
        <workflow-step-inspector-step :step="selectionNode" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts">
// 查看 workflow step 详情
import { Component, InjectReactive } from 'vue-property-decorator'
import { WorkflowModel, StepModel } from 'cwlts/models'
import WorkflowStepInspectorStep from '@/pages/_components/Graph/components/WorkflowStepInspectorStep.vue'
import StepInputsInspector from '@/pages/_components/Graph/components/StepInputsInspector.vue'
import LoadingButton from '@/components/LoadingButton.vue'
import DialogResetForm from '@/pages/_components/DialogResetForm.vue'
import WorkflowStepInspectorInfo from '@/pages/_components/Graph/components/WorkflowStepInspectorInfo.vue'

@Component({
  components: { WorkflowStepInspectorInfo, WorkflowStepInspectorStep, StepInputsInspector, LoadingButton },
  data() {
    return {
      selectionNode: null,
    }
  },
})
export default class WorkflowStepInspector extends DialogResetForm {
  @InjectReactive('model')
  private model!: WorkflowModel

  selectionNode!: StepModel
  activeName = 'input'

  get dialogTitle(): string {
    return '编辑' + '  ' + this.selectionNode?.label
  }

  showDialog(selectionNode: StepModel): void {
    this.selectionNode = selectionNode
    this.activeName = 'input'
    this.dialogVisible = true
  }
  resetFields(): void {
    ;(this.selectionNode as any) = null
  }
}
</script>
