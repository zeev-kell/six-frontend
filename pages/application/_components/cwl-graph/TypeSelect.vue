<template>
  <div>
    <el-form-item label="Type" prop="type">
      <select v-model="ruleForm.type" class="form-control" :disabled="readonly" @change="onFormChange">
        <option v-for="type of types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </el-form-item>
    <!--Type-->
    <div v-if="isParamTypeArray" class="el-row el-row--flex">
      <label class="el-col-full">Allow array as well as a single item</label>
      <div class="el-col-auto">
        {{ ruleForm.isItemOrArray ? 'Yes' : 'No' }}
        <el-switch v-model="ruleForm.isItemOrArray" :disabled="readonly" @change="onFormChange"></el-switch>
      </div>
    </div>
    <!--Item type-->
    <el-form-item v-show="!(paramType ? isParamTypeArray : undefined)" label="Items Type">
      <select v-model="ruleForm.items" class="form-control" :disabled="readonly" @change="onFormChange">
        <option v-for="item of itemTypes" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </el-form-item>
  </div>
</template>

<script type="text/babel">
  import { ParameterTypeModel } from 'cwlts/models/generic/ParameterTypeModel'

  export default {
    name: 'TypeSelect',
    props: {
      readonly: {
        type: Boolean,
        default: false,
      },
      paramType: {
        type: ParameterTypeModel,
        default: null,
      },
    },
    data() {
      return {
        types: ['array', 'enum', 'record', 'File', 'string', 'int', 'float', 'boolean', 'map'],
        itemTypes: ['enum', 'record', 'File', 'string', 'int', 'float', 'boolean', 'map'],
        ruleForm: {
          type: undefined,
          items: undefined,
          isItemOrArray: undefined,
        },
        rules: {},
      }
    },
    computed: {
      isParamTypeArray() {
        return this.paramType?.type !== 'array'
      },
    },
    watch: {
      paramType: {
        immediate: true,
        handler(paramType) {
          if (!paramType) {
            return
          }
          if (paramType.hasDirectoryType) {
            if (!this.types.includes('Directory')) {
              this.types.push('Directory')
            }
            if (!this.itemTypes.includes('Directory')) {
              this.itemTypes.push('Directory')
            }
          }
          this.ruleForm.type = this.paramType.type
          this.ruleForm.items = this.paramType.items
          this.ruleForm.isItemOrArray = this.paramType.isItemOrArray
        },
      },
    },
    methods: {
      onFormChange() {
        const ruleForm = this.ruleForm
        if (ruleForm.type !== undefined) {
          this.paramType.type = ruleForm.type
        }
        this.paramType.isItemOrArray = ruleForm.isItemOrArray
        if (ruleForm.type === 'array') {
          this.paramType.items = ruleForm.items
          if (this.paramType.isItemOrArray) {
            this.paramType.isItemOrArray = false
            ruleForm.isItemOrArray = false
          }
        }
        if (this.paramType.type === 'array' && !this.paramType.items) {
          this.paramType.items = 'File'
          ruleForm.items = 'File'
        }
        this.$emit('onUpdate', this.paramType)
      },
    },
  }
</script>
