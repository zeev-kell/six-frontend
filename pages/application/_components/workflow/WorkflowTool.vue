<template>
  <div class="workflow-tool">
    <el-button-group>
      <el-button type="dark" size="mini" icon="el-icon-plus" title="放大" @click="upscale" />
      <el-button type="dark" size="mini" icon="el-icon-minus" title="缩小" @click="downscale" />
      <el-button type="dark" size="mini" icon="iconfont icon-fullscreen" title="适应窗口" @click="fitToViewport" />
    </el-button-group>
    <el-button type="dark" size="mini" icon="el-icon-magic-stick" title="自动排版" @click="autoLayout" />
  </div>
</template>

<script type="text/babel">
  import { SVGArrangePlugin, Workflow } from 'cwl-svg'
  import { DeletionPlugin } from 'cwl-svg/compiled/src/plugins/deletion/deletion'

  export default {
    name: 'WorkflowTool',
    props: {
      workflow: {
        type: Workflow,
        default: null,
      },
      tool: {
        type: String,
        default: '',
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        scaleStep: 0.1,
      }
    },
    methods: {
      // 自动排版
      autoLayout() {
        // 第一次调用居中，第二次调用重新排列
        this.workflow.getPlugin(SVGArrangePlugin).arrange()
      },
      // 放大
      upscale() {
        const scale = this.workflow.scale
        if (scale < this.workflow.maxScale) {
          this.workflow.scale = Math.min(scale + this.scaleStep, this.workflow.maxScale)
        }
      },
      // 缩小
      downscale() {
        const scale = this.workflow.scale
        if (scale > this.workflow.minScale) {
          this.workflow.scale = Math.max(scale - this.scaleStep, this.workflow.minScale)
        }
      },
      // 适应窗口
      fitToViewport() {
        this.workflow.fitToViewport()
      },
      // 删除选择的元素
      deleteSelectedElement() {
        this.graph.getPlugin(DeletionPlugin).deleteSelection()
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  .workflow-tool {
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 10;
    color: white;
  }
  .el-button--mini {
    padding: 8px;
  }
</style>
