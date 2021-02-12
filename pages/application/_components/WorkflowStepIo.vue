<template>
  <el-form :model="ruleForm" :rules="rules" label-position="top">
    <!--Required-->
    <div v-if="isInput" class="el-form-item el-row--flex">
      <label class="el-col-full">Required</label>
      <div class="el-col-auto">
        <el-switch v-model="ruleForm.isRequired" @change="step.type.isNullable = $event"></el-switch>
      </div>
    </div>
    <!--ID-->
    <el-form-item label="ID" prop="id">
      <input v-model="ruleForm.id" type="text" class="form-control" />
    </el-form-item>
    <!--Connections-->
    <div v-if="!isInput" class="mb-05r">
      <!--No connections-->
      <div v-if="step['source'].length === 0">
        <span class="text-warning small"> <i class="el-icon-warning"></i> This port is not connected </span>
      </div>
      <!--List of connections-->
      <div v-if="step['source'].length > 0" class="text-muted small">Connections: {{ step['source'].join(', ') }}</div>
    </div>
    <!--Label-->
    <el-form-item label="Label" prop="label">
      <input v-model="ruleForm.label" type="text" class="form-control" @blur="labelUpdate($event)" />
    </el-form-item>
    <!--Input Type -->
    <type-select :param-type="ruleForm.typeForm" @onUpdate="onParamTypeChange"></type-select>
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
      ></el-select>
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
      ></el-select>
    </el-form-item>
    <!--Batch group-->
    <el-form-item v-if="isHasBatch" prop="batchType">
      <label slot="label">
        Create batch group
        <el-tooltip v-if="customValueIsNotSelected">
          <span class="text-warning small">
            <i class="el-icon-warning"></i>
          </span>
          <div slot="content">
            This workflow has a batch criteria which has been set via the API. If you change it, you won't be able to
            restore the custom batch criteria afterwards.
          </div>
        </el-tooltip>
      </label>
      <!--Batch select-->
      <select v-if="isBatch" v-model="ruleForm.batchType" class="form-control" @change="onBatchTypeChange">
        <option
          v-for="(propertyType, index) of batchByList"
          :key="index"
          :disabled="readonly"
          :value="propertyType.value"
        >
          {{ propertyType.label }}
        </option>
      </select>
      <!--Warning when some other input is already configured as batch-->
      <div v-else class="text-warning small">
        <i class="el-icon-warning"></i>
        Only one input per workflow can be configured as batch. Grouping criteria has already been set on #
        {{ workflowModel['batchInput'] }}.
      </div>
    </el-form-item>
    <!--Description-->
    <el-form-item label="Description" prop="description">
      <textarea
        v-model="ruleForm.description"
        class="form-control"
        rows="4"
        @change="onChange('description')"
      ></textarea>
    </el-form-item>
    <!--Secondary Files-->
    <el-form-item label="Secondary Files"></el-form-item>
  </el-form>
</template>

<script type="text/babel">
  import TypeSelect from '@/pages/application/_components/TypeSelect'
  import { WorkflowInputParameterModel } from 'cwlts/models/generic/WorkflowInputParameterModel'

  export default {
    name: 'WorkflowStepIo',
    components: { TypeSelect },
    props: {
      step: {
        type: Object,
        default: null,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      workflowModel: {
        type: Object,
        default: null,
      },
      workflow: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        ruleForm: {
          id: undefined,
          isRequired: false,
          label: undefined,
          typeForm: null,
          symbols: null,
          description: undefined,
          fileTypes: null,
          secondaryFiles: null,
        },
        rules: {
          id: [
            { required: true, message: 'ID must be set', trigger: 'blur' },
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                try {
                  if (this.step.id === value) {
                    return
                  }
                  // Change id on workflow model so canvas can interact with it
                  this.workflowModel.changeIONodeId(this.step, value)
                  this.workflow.draw()
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
        },
        initSymbolsList: [],
        batchByList: [
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
            value: [
              'metadata.sample_id',
              'metadata.library_id',
              'metadata.platform_unit_id',
              'metadata.file_segment_number',
            ],
          },
        ],
        // Value in batchByList that should be selected in DOM. This is added in order to solve the problem when we have
        // a custom value for batch by (when you type it manually in Code mode). We need this because of array values
        // (other way it will not preselect the value in DOM select input)
        selectedBatchByOption: undefined,
        // Initial batchByList length (to know if there is a custom value by comparing this value and current list length)
        batchByListInitialLength: 7,
      }
    },
    computed: {
      isInput() {
        return this.step instanceof WorkflowInputParameterModel
      },
      isEnumType() {
        return this.step.type.type === 'enum' || (this.step.type.type === 'array' && this.step.type.items === 'enum')
      },
      isFileType() {
        return this.step.type.type === 'File' || (this.step.type.type === 'array' && this.step.type.items === 'File')
      },
      /**
       * Return true if there is a custom value in batchByList and that value is not selected
       */
      customValueIsNotSelected() {
        return (
          this.batchByList.length > this.batchByListInitialLength &&
          this.selectedBatchByOption !== this.batchByList[this.batchByList.length - 1].value
        )
      },
      isHasBatch() {
        return this.workflowModel ? this.workflowModel.hasBatch && this.isInput : false
      },
      isBatch() {
        return !this.workflowModel.batchInput || this.workflowModel.batchInput === this.step.id
      },
    },
    watch: {
      step: {
        immediate: true,
        handler(newStep) {
          if (!newStep) {
            // Happens when you go through wf history to the beginning
            return
          }
          this.ruleForm.isRequired = newStep.type.isNullable
          this.ruleForm.id = newStep.id
          this.ruleForm.label = newStep.label
          this.ruleForm.typeForm = newStep.type
          this.ruleForm.symbols = newStep.type.symbols || this.initSymbolsList
          this.ruleForm.description = newStep.description
          this.ruleForm.fileTypes = newStep.fileTypes
          this.ruleForm.secondaryFiles = newStep.secondaryFiles || []
        },
      },
      workflow: {
        immediate: true,
        handler() {
          // If there was a custom value in batchByList and model is changed (Undo/Redo...) we have to remove that
          // custom value from batchByList
          if (this.batchByListInitialLength > this.batchByList.length) {
            this.batchByList.pop()
          }
        },
      },
      workflowModel: {
        immediate: true,
        handler(workflowModel) {
          if (workflowModel) {
            this.selectedBatchByOption = this.findBatchValueInTheList(workflowModel.batchByValue)
            this.ruleForm.batchType = this.selectedBatchByOption
          }
        },
      },
    },
    methods: {
      labelUpdate(ev) {
        const val = ev.srcElement.value
        if (val === this.step.label) {
          return
        }
        this.step.label = val || undefined
        this.workflow.draw()
      },
      findBatchValueInTheList(batchTypeValue) {
        if (!batchTypeValue) {
          // None value
          return this.batchByList.find((item) => item.value === 'none').value
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
          })
          return batchTypeValue
        }
      },
      onSymbolsChange(value) {
        if (value.length > 0 && this.isEnumType) {
          this.step.type.symbols = value
        }
      },
      onParamTypeChange() {
        if (!this.isFileType) {
          this.ruleForm.secondaryFiles = []
          // this.form.controls.secondaryFiles.disable({ onlySelf: true, emitEvent: false })
        } else {
          // this.form.controls.secondaryFiles.enable({ onlySelf: true, emitEvent: false })
        }
        this.workflowModel.validateConnectionsForIOPort(this.step)
      },
      onFileTypeChange(value) {
        this.step.fileTypes = value || []
        this.workflowModel.validateConnectionsForIOPort(this.step)
      },
      onChange(key) {
        this.step[key] = this.ruleForm[key]
      },
      onBatchTypeChange(batchType) {
        this.selectedBatchByOption = batchType
        this.workflowModel.setBatch(this.step.id, batchType)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet"></style>
