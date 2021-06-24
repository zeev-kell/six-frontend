<template>
  <div class="selection-step">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" @submit.native.prevent>
      <!--ID-->
      <el-form-item label="ID" prop="id">
        <el-step-item v-slot="{ onBlur }" :value="ruleForm.id">
          <input v-model="ruleForm.id" :disabled="readonly" class="form-control" @blur="onBlur()" />
        </el-step-item>
      </el-form-item>

      <!--Label-->
      <el-form-item label="Label" prop="label">
        <input v-model="ruleForm.label" :disabled="readonly" class="form-control" />
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
        <textarea v-model="ruleForm.description" class="form-control" rows="4" :disabled="readonly"></textarea>
      </el-form-item>

      <selection-step-hints :step="step" :readonly="readonly"></selection-step-hints>
    </el-form>
  </div>
</template>

<script type="text/babel">
import ElStepItem from '@/pages/application/_components/ElStepItem'
import SelectionStepHints from '@/pages/application/_components/graph/SelectionStepHints'
import debounce from '@/utils/debounce'

export default {
  name: 'SelectionStep',
  components: { SelectionStepHints, ElStepItem },
  props: {
    step: {
      type: Object,
      default: null,
    },
    workflowModel: {
      type: Object,
      default: null,
    },
    workflow: {
      type: Object,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ruleForm: {
        id: undefined,
        label: undefined,
        scatterMethod: undefined,
        scatter: undefined,
        description: undefined,
      },
      rules: {
        id: [
          { required: true, message: 'ID must be set', trigger: 'blur' },
          {
            trigger: 'change',
            validator: (rule, value, callback) => {
              try {
                this.workflowModel.changeStepId(this.step, value)
                this.workflow.draw()
                callback()
              } catch (e) {
                callback(new Error(e.message))
              }
            },
          },
        ],
      },
      scatterMethodOptions: [
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
      ],
      dialogHintsVisible: false,
    }
  },
  watch: {
    step: {
      immediate: true,
      handler(newStep) {
        this.ruleForm.id = newStep.id
        this.ruleForm.label = newStep.label
        this.ruleForm.scatterMethod = newStep.scatterMethod || ''
        this.ruleForm.scatter = newStep.scatter || ''
        this.ruleForm.description = newStep.description
      },
    },
  },
  mounted() {
    const keys = Object.keys(this.ruleForm).filter((k) => k !== 'id')
    // 优化监听循环，改成 step 更新时取消所有的 ruleForm 监听
    keys.forEach((k) => {
      const debounced = debounce((value) => {
        this.step[k] = value
      }, 500)
      this.$watch('ruleForm.' + k, function (value) {
        // console.log('watch.ruleForm' + k, value)
        debounced(value)
      })
    })
  },
  methods: {},
}
</script>
