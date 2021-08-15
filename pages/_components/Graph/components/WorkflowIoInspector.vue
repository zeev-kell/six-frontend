<template>
  <el-form :model="ruleForm" :rules="rules" label-position="top" @submit.native.prevent>
    <!--Required-->
    <div v-if="isInput" class="el-form-item el-row--flex">
      <label class="el-col-full">{{ $t('cwl.Required') }}</label>
      <div class="el-col-auto">
        <el-switch v-model="ruleForm.isRequired" :disabled="readonly" @change="step.type.isNullable = $event" />
      </div>
    </div>
    <!--ID-->
    <el-form-item label="ID" prop="id">
      <input v-model="ruleForm.id" class="form-control" :disabled="readonly" />
    </el-form-item>
    <!--Connections-->
    <div v-if="!isInput" class="m-b-05">
      <!--No connections-->
      <div v-if="step['source'].length === 0">
        <span class="text-warning small"> <i class="el-icon-warning" /> This port is not connected </span>
      </div>
      <!--List of connections-->
      <div v-if="step['source'].length > 0" class="text-muted small">
        {{ $t('cwl.Connections') }}:
        {{ step['source'].join(', ') }}
      </div>
    </div>
    <!--Label-->
    <el-form-item label="Label" prop="label">
      <input v-model="ruleForm.label" class="form-control" :disabled="readonly" @input="onLabelChange" />
    </el-form-item>
    <!--Input Type -->
    <type-select :param-type="ruleForm.typeForm" :readonly="readonly" @onUpdate="onParamTypeChange" />
    <!--Symbols-->
    <el-form-item v-if="isEnumType" label="Symbols" prop="symbols">
      <el-select
        v-model="ruleForm.symbols"
        multiple
        filterable
        allow-create
        size="mini"
        :disabled="readonly"
        no-data-text="无推荐数据"
        placeholder=""
        @change="onSymbolsChange"
      />
    </el-form-item>
    <!--File Types-->
    <el-form-item v-if="isFileType" label="File types" prop="fileTypes">
      <el-select
        v-model="ruleForm.fileTypes"
        multiple
        filterable
        allow-create
        size="mini"
        :disabled="readonly"
        no-data-text="无推荐数据"
        placeholder=""
        @change="onFileTypeChange"
      />
    </el-form-item>
    <!--Batch group-->
    <el-form-item v-if="isHasBatch" prop="batchType">
      <label slot="label">
        Create batch group
        <el-tooltip v-if="customValueIsNotSelected">
          <span class="text-warning small">
            <i class="el-icon-warning" />
          </span>
          <div slot="content">
            This workflow has a batch criteria which has been set via the API. If you change it, you won't be able to restore the custom batch
            criteria afterwards.
          </div>
        </el-tooltip>
      </label>
      <!--Batch select-->
      <select v-if="isBatch" v-model="ruleForm.batchType" class="form-control" :disabled="readonly" @change="onBatchTypeChange">
        <option v-for="(propertyType, index) of batchByList" :key="index" :value="propertyType.value">
          {{ propertyType.label }}
        </option>
      </select>
      <!--Warning when some other input is already configured as batch-->
      <div v-else class="text-warning small" style="line-height: 1">
        <i class="el-icon-warning" />
        Only one input per workflow can be configured as batch. Grouping criteria has already been set on #
        {{ workflowModel['batchInput'] }}.
      </div>
    </el-form-item>
    <!--Description-->
    <el-form-item :label="$t('cwl.Description')" prop="description">
      <textarea v-model="ruleForm.description" class="form-control" rows="4" :disabled="readonly" @change="onChange('description')" />
    </el-form-item>
    <!-- TODO -->
    <!--Secondary Files-->
    <collapse-item title="SecondaryFiles">
      <!--      <div>{{ ruleForm.secondaryFiles }}</div>-->
    </collapse-item>
  </el-form>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue, Watch } from 'nuxt-property-decorator'
import TypeSelect from '@/pages/application/_components/graph/TypeSelect.vue'
import debounce from '@/utils/debounce'
import CollapseItem from '@/pages/application/_components/CollapseItem.vue'
import { WorkflowModel, WorkflowOutputParameterModel, WorkflowInputParameterModel } from 'cwlts/models'
import { Workflow } from 'cwl-svg'

@Component({
  components: { TypeSelect, CollapseItem },
})
export default class WorkflowIoInspector extends Vue {
  @InjectReactive('model')
  model!: WorkflowModel
  @InjectReactive('graph')
  graph!: Workflow

  @Prop({ required: true })
  step!: WorkflowInputParameterModel | WorkflowOutputParameterModel
  @Prop({ default: false })
  readonly!: boolean

  ruleForm: any = {
    id: undefined,
    isRequired: false,
    label: undefined,
    typeForm: null,
    symbols: null,
    description: undefined,
    fileTypes: null,
    secondaryFiles: null,
  }
  rules = {
    id: [
      { required: true, message: 'ID must be set', trigger: 'blur' },
      {
        trigger: 'change',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validator: (rule: any, value: string, callback: any) => {
          try {
            if (this.step.id === value) {
              return
            }
            // Change id on workflow model so canvas can interact with it
            this.model.changeIONodeId(this.step, value)
            this.graph.draw()
            if (this.isEnumType) {
              this.step.type.name = value
            }
            callback()
          } catch (e) {
            callback(new Error(e.message))
          }
        },
      },
    ],
  }
  initSymbolsList = []
  batchByList = [
    {
      label: 'None',
      value: 'none',
    },
    {
      label: 'File',
      value: 'item',
    },
    {
      label: 'Sample',
      value: ['metadata.sample_id'],
    },
    {
      label: 'Case',
      value: ['metadata.case_id'],
    },
    {
      label: 'Library (Sample + Library)',
      value: ['metadata.sample_id', 'metadata.library_id'],
    },
    {
      label: 'Platform unit (Sample + Library + Platform unit)',
      value: ['metadata.sample_id', 'metadata.library_id', 'metadata.platform_unit_id'],
    },
    {
      label: 'File segment (Sample + Library + Platform unit + File segment)',
      value: ['metadata.sample_id', 'metadata.library_id', 'metadata.platform_unit_id', 'metadata.file_segment_number'],
    },
  ]
  // Value in batchByList that should be selected in DOM. This is added in order to solve the problem when we have
  // a custom value for batch by (when you type it manually in Code mode). We need this because of array values
  // (other way it will not preselect the value in DOM select input)
  selectedBatchByOption: any = null
  // Initial batchByList length (to know if there is a custom value by comparing this value and current list length)
  batchByListInitialLength = 7

  get isInput(): boolean {
    return this.step instanceof WorkflowInputParameterModel
  }
  get isEnumType(): boolean {
    return this.step.type.type === 'enum' || (this.step.type.type === 'array' && this.step.type.items === 'enum')
  }
  get isFileType(): boolean {
    return this.step.type.type === 'File' || (this.step.type.type === 'array' && this.step.type.items === 'File')
  }
  /**
   * Return true if there is a custom value in batchByList and that value is not selected
   */
  get customValueIsNotSelected(): boolean {
    return (
      this.batchByList.length > this.batchByListInitialLength && this.selectedBatchByOption !== this.batchByList[this.batchByList.length - 1].value
    )
  }
  get isHasBatch(): boolean {
    return this.model ? this.model.hasBatch && this.isInput : false
  }
  get isBatch(): boolean {
    return !this.model.batchInput || this.model.batchInput === this.step.id
  }

  @Watch('step', { immediate: true })
  onWatchStep(newStep: WorkflowInputParameterModel | WorkflowOutputParameterModel) {
    if (newStep) {
      // Happens when you go through wf history to the beginning
      this.ruleForm.isRequired = newStep.type.isNullable
      this.ruleForm.id = newStep.id
      this.ruleForm.label = newStep.label
      this.ruleForm.typeForm = newStep.type
      this.ruleForm.symbols = newStep.type.symbols || this.initSymbolsList
      this.ruleForm.description = newStep.description
      this.ruleForm.fileTypes = newStep.fileTypes
      this.ruleForm.secondaryFiles = newStep.secondaryFiles || []
    }
  }
  @Watch('graph', { immediate: true })
  onWatchGraph() {
    // If there was a custom value in batchByList and model is changed (Undo/Redo...) we have to remove that
    // custom value from batchByList
    if (this.batchByListInitialLength > this.batchByList.length) {
      this.batchByList.pop()
    }
  }
  @Watch('model', { immediate: true, deep: true })
  onWatchModel(model: WorkflowModel) {
    if (model) {
      this.selectedBatchByOption = this.findBatchValueInTheList(model.batchByValue)
      this.ruleForm.batchType = this.selectedBatchByOption
    }
  }

  findBatchValueInTheList(batchTypeValue: string | string[]) {
    if (!batchTypeValue) {
      // None value
      return this.batchByList.find((item: any) => item.value === 'none')!.value
    }
    // Find if batchTypeValue is in batchByList
    const criteriaInList = this.batchByList.find((batchBy) => {
      if (Array.isArray(batchBy.value) && Array.isArray(batchTypeValue)) {
        return batchBy.value.slice().sort().toString() === batchTypeValue.slice().sort().toString()
      } else {
        return batchBy.value === batchTypeValue
      }
    })
    if (criteriaInList) {
      return criteriaInList.value
    } else {
      // If its a custom value, should be added to a list
      this.batchByList.push({
        label: 'Api: ' + batchTypeValue,
        value: batchTypeValue,
      } as any)
      return batchTypeValue
    }
  }
  onLabelChange = debounce(() => {
    const val = this.ruleForm.label
    if (val === this.step.label) {
      return
    }
    ;(this.step as any).label = val || undefined
    this.graph.draw()
  }, 500)
  onSymbolsChange(value: any[]): void {
    if (value.length > 0 && this.isEnumType) {
      this.step.type.symbols = value
    }
  }
  onParamTypeChange(): void {
    if (!this.isFileType) {
      this.ruleForm.secondaryFiles = []
      // this.form.controls.secondaryFiles.disable({ onlySelf: true, emitEvent: false })
    } else {
      // this.form.controls.secondaryFiles.enable({ onlySelf: true, emitEvent: false })
    }
    this.model.validateConnectionsForIOPort(this.step)
  }
  onFileTypeChange(value?: any[]) {
    this.step.fileTypes = value || []
    this.model.validateConnectionsForIOPort(this.step)
  }
  onChange(key: any): void {
    ;(this.step as any)[key] = this.ruleForm[key]
  }
  onBatchTypeChange(): void {
    this.selectedBatchByOption = this.ruleForm.batchType
    this.model.setBatch(this.step.id, this.ruleForm.batchType)
  }
}
</script>
