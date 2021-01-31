<template>
  <div>
    <el-button size="mini" icon="el-icon-magic-stick" title="自动排版" @click="autoLayout"></el-button>
  </div>
</template>

<script type="text/babel">
  import { SVGArrangePlugin, Workflow } from 'cwl-svg'

  export default {
    name: 'ToolBox',
    props: {
      workflow: {
        type: Workflow,
        default: null,
      },
    },
    methods: {
      /**
       * 自动排版
       */
      autoLayout() {
        // 第一次调用居中，第二次调用重新排列
        this.workflow.getPlugin(SVGArrangePlugin).arrange()
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet"></style>
