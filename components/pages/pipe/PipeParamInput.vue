<template>
  <el-form-item :prop="param.name + '.default'" :rules="rules">
    <span slot="label" class="sub-name">
      <strong>{{ param.name }}</strong>
      <el-tooltip placement="top" effect="light">
        <i class="el-icon-question el-success"></i>
        <div slot="content" style="max-width: 250px">{{ param.help }}</div>
      </el-tooltip>
      :
    </span>
    <el-input
      v-if="tagType === 'input'"
      v-model="param.default"
      placeholder="请输入内容"
      :type="param.value_type === 'int' ? 'number' : 'text'"
    ></el-input>
    <el-select v-else-if="tagType === 'selection'" v-model="param.default" placeholder="请选择">
      <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-checkbox v-else-if="tagType === 'logical'" v-model="param.default">选择</el-checkbox>
  </el-form-item>
</template>

<script type="text/babel">
  export default {
    name: 'PipeParamInput',
    props: {
      param: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        tagType: this.param.value_mode,
      }
    },
    computed: {
      options() {
        if (this.tagType === 'selection') {
          const length = this.param.valid_range.length
          const values = this.param.valid_range.substring(1, length - 2)
          return values.split('|')
        } else {
          return []
        }
      },
      rules() {
        const rules = []
        if (this.param.optional === false) {
          rules.push({
            required: true,
            message: '不能为空',
            trigger: 'blur',
          })
        }
        if (this.param.valid_range) {
          rules.push({
            validator: this.validatePass,
            trigger: 'blur',
          })
        }
        return rules
      },
    },
    methods: {
      validatePass(rule, value, callback) {
        let msg
        if (value !== '') {
          const reg = new RegExp(this.param.valid_range)
          if (!reg.test(value)) {
            msg = '语法有误，参考：' + this.param.valid_range
          }
        }
        callback(msg)
      },
    },
  }
</script>
