<template>
  <div class="sub-value">
    <el-input
      v-if="tagType === 'input'"
      v-model="input"
      placeholder="请输入内容"
      :type="param.value_type === 'int' ? 'number' : 'text'"
    ></el-input>
    <el-select v-else-if="tagType === 'selection'" v-model="input">
      <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
    <el-checkbox v-else-if="tagType === 'logical'" v-model="input">选择</el-checkbox>
  </div>
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
        input: this.param.default,
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
    },
  }
</script>
