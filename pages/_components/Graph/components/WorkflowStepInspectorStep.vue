<template>
  <div class="workflow-step-inspector-step">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" @submit.native.prevent>
      <!--ID-->
      <el-form-item label="ID" prop="id">
        <el-step-item v-slot="{ onBlur }" :value="ruleForm.id">
          <input v-model="ruleForm.id" :disabled="readonly" class="form-control" @blur="onBlur()" />
        </el-step-item>
      </el-form-item>

      <!--Label-->
      <el-form-item label="Label" prop="label">
        <input v-model="ruleForm.label" :disabled="readonly" class="form-control" @change="onLabelChange" />
      </el-form-item>

      <!--Scatter Method-->
      <el-form-item v-if="step.hasScatterMethod" label="Scatter Method" prop="label">
        <select v-model="ruleForm.scatterMethod" class="form-control" :disabled="readonly">
          <option value="">-- none --</option>
          <option v-for="method of scatterMethodOptions" :key="method.value" :value="method.value">
            {{ method.caption }}
          </option>
        </select>
      </el-form-item>

      <!--Scatter-->
      <el-form-item label="Scatter">
        <!--Single Scatter-->
        <select v-if="!step.hasMultipleScatter" v-model="ruleForm.scatter" class="form-control" :disabled="readonly">
          <option value="">-- none --</option>
          <option v-for="input of step.in" :key="input.id" :value="input.id">{{ input.label }} (#{{ input.id }})</option>
        </select>

        <!--Multiple Scatter-->
        <select v-if="step.hasMultipleScatter" v-model="ruleForm.scatter" class="form-control" multiple :disabled="readonly">
          <option v-for="opt of step.in" :key="opt.id" :value="opt.id">
            {{ opt.id }}
          </option>
        </select>
      </el-form-item>

      <!--Description-->
      <el-form-item :label="$t('cwl.Description')">
        <textarea v-model="ruleForm.description" class="form-control" rows="4" :disabled="readonly" />
      </el-form-item>

      <selection-step-hints :step="step" :readonly="readonly" />
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { StepModel, WorkflowModel } from 'cwlts/models'
import { Workflow } from 'cwl-svg'
import { checkKeyWord } from '@/pages/_components/Graph/KeyWords'
import ElStepItem from '@/components/ElStepItem.vue'
import SelectionStepHints from '@/pages/_components/Graph/components/SelectionStepHints.vue'
import debounce from '@/utils/debounce'

@Component({
  components: { SelectionStepHints, ElStepItem },
})
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
  scatterMethodOptions = [
    {
      value: 'dotproduct',
      caption: 'Dot Product',
    },
    {
      value: 'nested_crossproduct',
      caption: 'Nested Cross Product',
    },
    {
      value: 'flat_crossproduct',
      caption: 'Flat Cross Product',
    },
  ]

  @Watch('step', { immediate: true })
  onStepWatch(newStep: StepModel): void {
    this.ruleForm.id = newStep.label || newStep.id
    this.ruleForm.label = newStep.label
    this.ruleForm.scatterMethod = newStep.scatterMethod || ''
    this.ruleForm.scatter = newStep.scatter || ''
    this.ruleForm.description = newStep.description
  }

  onIdValidate(rule: never, value: string, callback: (e?: Error) => void): void {
    if (value === '' || value.trim() === '') {
      callback()
      return
    }
    // 与原来值一致，直接忽略
    if (this.step.id === value) {
      // this.step.label = value
      // this.graph.draw()
      callback()
      return
    }
    console.log('onIdValidate changeStepId', value)
    try {
      checkKeyWord(value, this.graph.model)
      this.model.changeStepId(this.step, value)
      // this.step.label = value
      this.graph.draw()
      callback()
    } catch (e) {
      console.log(e)
      callback(new Error(e.message))
    }
  }
  onLabelChange(): void {
    this.step.label = this.ruleForm.label
    this.graph.draw()
  }

  mounted(): void {
    const keys = Object.keys(this.ruleForm).filter((k) => k !== 'id' && k !== 'label')
    // 优化监听循环，改成 step 更新时取消所有的 ruleForm 监听
    keys.forEach((k) => {
      const debounced = debounce((value: string) => {
        ;(this.step as any)[k] = value
      }, 500)
      this.$watch('ruleForm.' + k, function (value) {
        // console.log('watch.ruleForm' + k, value)
        debounced(value)
      })
    })
  }
}
</script>
