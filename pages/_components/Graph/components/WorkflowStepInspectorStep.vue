<template>
  <div class="selection-step">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" @submit.native.prevent>
      <!--ID-->
      <el-form-item label="ID" prop="id">
        <el-input v-model="ruleForm.id" :disabled="readonly" />
      </el-form-item>
      <!--Description-->
      <el-form-item :label="$t('graph.description')">
        <el-input v-model="ruleForm.description" type="textarea" rows="4" :disabled="readonly" @change="onDescChange" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue, Watch } from 'vue-property-decorator'
import { StepModel, WorkflowModel } from 'cwlts/models'
import { Workflow } from 'cwl-svg'
import { checkKeyWord } from '@/pages/_components/Graph/KeyWords'

@Component
export default class WorkflowStepInspectorStep extends Vue {
  @InjectReactive('model')
  private model!: WorkflowModel
  @InjectReactive('graph')
  private graph!: Workflow
  @Prop({ required: true })
  step!: StepModel
  @Prop({ default: false })
  readonly!: boolean

  ruleForm: { [index: string]: any } = {
    id: undefined,
    label: undefined,
    scatterMethod: undefined,
    scatter: undefined,
    description: undefined,
  }
  rules = {
    id: [
      { required: true, message: this.$t('validate.key', ['ID']), trigger: 'change' },
      {
        trigger: 'blur',
        validator: this.onIdValidate,
      },
    ],
  }

  @Watch('step', { immediate: true })
  onStepWatch(newStep: StepModel): void {
    this.ruleForm.id = newStep.label || newStep.id
    // this.ruleForm.label = newStep.label
    // this.ruleForm.scatterMethod = newStep.scatterMethod || ''
    // this.ruleForm.scatter = newStep.scatter || ''
    this.ruleForm.description = newStep.description
  }

  onIdValidate(rule: never, value: string, callback: (e?: Error) => void): void {
    // 已原来值一致，直接忽略
    if (value === '' || value.trim() === '' || this.step.label === value) {
      callback()
      return
    }
    if (this.step.id === value && this.step.label !== value) {
      this.step.label = value
      this.graph.draw()
      callback()
      return
    }
    console.log('onIdValidate changeStepId', value)
    try {
      checkKeyWord(value, this.graph.model)
      this.model.changeStepId(this.step, value)
      this.step.label = value
      this.graph.draw()
      callback()
    } catch (e) {
      console.log(e)
      callback(new Error(e.message))
    }
  }

  onDescChange(value: string): void {
    this.step.description = value
  }
}
</script>
