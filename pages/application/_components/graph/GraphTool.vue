<template>
  <div class="graph-tool">
    <div v-for="(group, index) of toolList" :key="index" class="d-inline-b">
      <div class="el-button-group">
        <el-button
          v-for="btn of group"
          :key="btn.title"
          :title="btn.title"
          :icon="btn.icon"
          type="dark"
          size="mini"
          @click="onClick(btn.action)"
        ></el-button>
      </div>
    </div>
    <el-dialog title="下载文件" :append-to-body="true" :visible.sync="downloadVisible" center class="el-dialog-dark">
      <div>
        <p>选择需要下载的内容</p>
        <el-checkbox v-model="dMain">主文件</el-checkbox>
        <el-checkbox v-model="dJob">运行参数文件</el-checkbox>
      </div>
      <div>
        <p>选择下载内容的格式</p>
        <el-radio v-model="dType" label="json">JSON 格式</el-radio>
        <el-radio v-model="dType" label="yaml">YAML 格式</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="downloadVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onDownload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { SVGArrangePlugin, Workflow } from 'cwl-svg'
  import { downloadBlobLink } from '@/utils/download-link'
  import { DeletionPlugin } from 'cwl-svg/compiled/src/plugins/deletion/deletion'
  const BUTTON_LIST = {
    run: {
      icon: 'el-icon-video-play',
      title: '运行',
      action: 'toRun',
    },
    plus: {
      icon: 'el-icon-plus',
      title: '放大',
      action: 'upscale',
    },
    minus: {
      icon: 'el-icon-minus',
      title: '缩小',
      action: 'downscale',
    },
    fit: {
      icon: 'iconfont icon-fullscreen',
      title: '适应窗口',
      action: 'fitToViewport',
    },
    auto: {
      icon: 'el-icon-magic-stick',
      title: '自动排版',
      action: 'autoLayout',
    },
    download: {
      icon: 'el-icon-download',
      title: '下载',
      action: 'download',
    },
  }

  export default {
    name: 'GraphTool',
    props: {
      workflow: {
        type: Workflow,
        default: null,
      },
      tools: {
        type: [String, Array],
        default: 'plus,minus,fit|auto',
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        scaleStep: 0.1,
        toolList: [],
        downloadVisible: false,
        dMain: true,
        dJob: true,
        dType: 'yaml',
      }
    },
    mounted() {
      // 统一处理为数组
      this.toolList = this.tools.split('|').map((tool) => {
        return tool.split(',').map((t) => BUTTON_LIST[t])
      })
    },
    methods: {
      // 自动排版
      autoLayout() {
        // 重新排列
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
      toRun() {
        this.$router.push(`/graph-info/${this.$route.params.id}/set-run`)
      },
      download() {
        this.downloadVisible = true
      },
      onClick(action, ...arg) {
        this[action](...arg)
      },
      async onDownload() {
        if (!this.dMain && !this.dJob) {
          return
        }
        if (this.dMain && !this.dJob) {
          this.TheGraph.exportCwl(this.dType)
        } else if (!this.dMain && this.dJob) {
          this.TheGraph.exportJob(this.dType)
        } else if (this.dMain && this.dJob) {
          const job = this.TheGraph.exportJob(this.dType, true)
          const main = this.TheGraph.exportCwl(this.dType, true)
          const JSZip = await import('jszip')
          // eslint-disable-next-line new-cap
          const zip = new JSZip.default()
          zip.file(main.name, main.data)
          zip.file(job.name, job.data)
          const content = await zip.generateAsync({ type: 'blob' })
          const name = main.name.split('.')[0]
          downloadBlobLink(content, name + '.zip')
        }
        this.downloadVisible = false
      },
    },
    inject: ['TheGraph'],
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  .graph-tool {
    position: absolute;
    right: 30px;
    top: 25px;
    z-index: 10;
    color: white;
    > .el-button {
      vertical-align: middle;
    }
  }
  .el-button--mini {
    padding: 8px;
  }
  .d-inline-b + .d-inline-b,
  .el-button-group + .el-button,
  .el-button + .el-button-group {
    margin-left: 4px;
  }
</style>
