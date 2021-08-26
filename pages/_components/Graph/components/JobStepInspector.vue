<template>
  <div class="job-step-inspector">
    <div v-if="inputGroups.length">
      <div v-for="group of inputGroups" :key="group.name">
        <collapse-item :title="'graph.' + group.name">
          <form @submit.prevent>
            <div v-for="(input, index) of group.inputs" :key="index" class="input-box">
              <!--Label and port options-->
              <div class="el-row is-justify-space-between el-row--flex">
                <label class="input-label" :title="input.label || getInputSource(input)">
                  <span v-if="!input.type.isNullable" class="text-danger">*</span>
                  <el-tooltip v-if="input.description" popper-class="input-tooltip-popper">
                    <div slot="content">
                      <h2>{{ input.label || getInputSource(input) }}</h2>
                      <div>
                        <span class="title">{{ $t('graph.Description') }}:</span>
                        <span class="value">{{ input.description }}</span>
                      </div>
                    </div>
                    <i class="el-icon-info text-muted" />
                  </el-tooltip>
                  {{ input.label || getInputSource(input) }}
                  <span class="text-muted">({{ input.type.type }})</span>
                </label>
                <div>
                  <el-dropdown trigger="click" @command="onPortOptionChange($event, input)">
                    <span class="pointer text-white">
                      <i class="el-icon-more" />
                    </span>
                    <el-dropdown-menu slot="dropdown" class="input-dropdown-menu">
                      <el-dropdown-item> {{ $t('graph.SetNull') }} </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <!--Input-->
              <input-value-editor
                v-if="jobGroup.controls[getInputSource(input)].enabled"
                :form-control="jobGroup.controls[getInputSource(input)]"
                :relative-path-root="relativePathRoot"
                :input-type="input.type.type"
                :input-array-items-type="input.type.items"
                :input-enum-symbols="input.type.symbols"
                :input-record-fields="input.type.fields"
                class="mb-0"
              />

              <div v-else class="text-center m-b-1">
                <p class="text-muted">
                  {{ $t('graph.NoValue') }}
                </p>
                <el-button v-if="isFileOrDirectory(input)" type="primary" size="mini" class="el-button-dark-border" @click="enableFileEditing(input)">
                  {{ $t('graph.Browse') }}
                </el-button>

                <el-button v-else type="primary" size="mini" class="el-button-dark-border" @click="enableEditing(input)">
                  {{ $t('graph.SetValue') }}
                </el-button>
              </div>

              <!--Connections-->
              <!--Only steps have sources, inputs and outputs don't-->
              <div v-if="input.source">
                <!--No connections-->
                <div v-if="input.source.length === 0 && input.isVisible">
                  <span v-if="input.type.isNullable" class="text-warning"> <i class="el-icon-warning" /> This port is not connected </span>
                  <span v-if="!input.type.isNullable" class="text-danger"> <i class="el-icon-error" /> This required port is not connected </span>
                </div>
                <!--List of connections-->
                <div v-if="input.source.length > 0" class="text-muted">{{ $t('graph.Connections') }}: {{ input.source.join(', ') }}</div>
              </div>
            </div>
          </form>
        </collapse-item>
      </div>
    </div>
    <div v-else>
      {{ $t('graph.NoAppParams') }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { WorkflowModel } from 'cwlts/models'
import { FormControl, FormGroup } from '@/components/FormControl'
import { WorkflowStepInputModel } from 'cwlts/models/generic/WorkflowStepInputModel'
import { WorkflowInputParameterModel } from 'cwlts/models/generic/WorkflowInputParameterModel'
import CollapseItem from '@/components/CollapseItem.vue'
import InputValueEditor from '@/pages/_components/Graph/components/InputValueEditor.vue'
import { normalizeJob } from '@/pages/_components/Graph/helpers/JobHelper'

@Component({
  components: { InputValueEditor, CollapseItem },
})
export default class JobStepInspector extends Vue {
  @InjectReactive('model')
  model!: WorkflowModel

  @Prop({ default: false })
  readonly!: boolean
  @Prop({ required: true })
  stepInputs!: any[]
  @Prop({ default: '' })
  relativePathRoot!: string

  jobGroup = new FormGroup({})
  inputGroups: any = []

  get jobValue(): any {
    return this.$store.state.graph.jobValue
  }

  @Watch('stepInputs', { immediate: true })
  onWatchStepInputs(stepInputs: any[], oldStepInputs: any[]) {
    // I have no idea why step input checking works
    if (stepInputs && !this.stepInputsAreSame(oldStepInputs, stepInputs || undefined)) {
      this.recreateForms()
      if (this.jobValue) {
        this.resetJobGroup()
      }
    }
  }

  resetJobGroup() {
    this.jobGroup.patchValue(this.jobValue, { emitEvent: false })
    for (const controlName of Object.keys(this.jobGroup.controls)) {
      const control = this.jobGroup.get(controlName)
      const kVal = this.jobValue[controlName]
      if (kVal === null || kVal === undefined) {
        // 数据为空，禁用校验等
        control.disable({ emitEvent: false, onlySelf: true })
      } else {
        control.enable({ emitEvent: false, onlySelf: true })
      }
    }
  }
  isType(input: any, types: any) {
    if (typeof types === 'string') {
      types = [types]
    }
    return !!types.find((type: string) => {
      return input.type.type === type || input.type.items === type
    })
  }
  clear(control: any) {
    control.setValue(null)
    control.disable()
  }
  getInputSource(input: any) {
    if (input instanceof WorkflowStepInputModel) {
      const inputSource = input.source[0]
      // Remove # if it exists on the beginning
      return inputSource[0] === '#' ? inputSource.substring(1) : inputSource
    }
    if (input instanceof WorkflowInputParameterModel) {
      return input.id
    }
  }
  recreateForms() {
    for (const controlName of Object.keys(this.jobGroup.controls)) {
      this.jobGroup.removeControl(controlName)
    }
    this.$set(this, 'jobGroup', new FormGroup({}))
    const grouped: any = {}
    for (const input of this.stepInputs) {
      const group = this.isType(input, 'File') ? 'Files' : 'AppParameters'
      if (!grouped[group]) {
        grouped[group] = []
      }
      grouped[group].push(input)
      const control = new FormControl()
      this.jobGroup.addControl(this.getInputSource(input), control)
      if (input.type.type === 'array') {
        control.setValue([], { emitEvent: false })
      } else if (input.type.type === 'record') {
        control.setValue({}, { emitEvent: false })
      }
    }
    // Order groups
    this.inputGroups = Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .map((key) => ({
        name: key,
        inputs: grouped[key],
      }))
  }
  stepInputsAreSame(previousValue: any, currentValue: any) {
    if (previousValue === currentValue) {
      return true
    }
    if (previousValue === undefined && currentValue !== undefined) {
      return false
    }
    if (previousValue !== undefined && currentValue === undefined) {
      return false
    }
    if (previousValue.length === 0 && currentValue.length === 0) {
      return true
    }
    if (previousValue.length !== currentValue.length) {
      return false
    }
    for (let i = 0; i < previousValue.length; i++) {
      if (previousValue[i] !== currentValue[i]) {
        return false
      }
    }
    return true
  }
  onPortOptionChange(event: any, input: any) {
    if (!event) {
      const name = this.getInputSource(input)
      this.clear(this.jobGroup.get(name))
    }
  }
  enableEditing(input: any) {
    const inputFormField = this.jobGroup.get(this.getInputSource(input))
    let value
    const isArray = input.type.type === 'array'
    const type = input.type.items || input.type.type
    if (type !== 'File' && type !== 'Directory') {
      inputFormField.enable({ onlySelf: true })
    }
    switch (type) {
      case 'record':
        value = {}
        break
      case 'string':
        value = ''
        break
      case 'int':
      case 'float':
        value = 0
        break
      case 'boolean':
        value = false
        break
      case 'File':
      case 'Directory':
        // TODO 修改选择器
        // eslint-disable-next-line no-case-declarations
        const fileValues = ['test.jpg'].map((p) => ({ class: type, path: p }))
        inputFormField.enable({ onlySelf: true })
        inputFormField.setValue(!isArray ? fileValues[0] : fileValues)
        break
      default:
        value = null
        break
    }
    inputFormField.setValue(input.type.type === 'array' ? [value] : value)
  }
  enableFileEditing(input: any) {
    const inputFormField = this.jobGroup.get(this.getInputSource(input))
    const isArray = input.type.type === 'array'
    const type = input.type.items || input.type.type
    inputFormField.enable({ onlySelf: true })
    // TODO 修改选择器
    // eslint-disable-next-line no-case-declarations
    const fileValues = [''].map((p) => ({ class: type, path: p }))
    inputFormField.setValue(!isArray ? fileValues[0] : fileValues)
  }
  isFileOrDirectory(input: any) {
    const type = input.type.type
    const itemsType = input.type.items
    return type === 'File' || type === 'Directory' || itemsType === 'File' || itemsType === 'Directory'
  }

  mounted() {
    this.$watch(
      'jobGroup.value',
      (changes) => {
        const out = { ...this.jobValue, ...changes }
        for (const cname in this.jobGroup.controls) {
          if (this.jobGroup.controls[cname].disabled) {
            out[cname] = null
          }
        }
        const jobValue = normalizeJob(out, this.model)
        this.$store.commit('graph/SET_JOB_VALUE', jobValue)
      },
      {
        deep: true,
      }
    )
  }
}
</script>
