<template>
  <el-dialog title="下载文件" :append-to-body="true" :visible.sync="downloadVisible" center class="el-dialog-dark">
    <div>
      <p>选择需要下载的内容</p>
      <el-checkbox v-model="dMain"> 主文件 </el-checkbox>
      <el-checkbox v-model="dJob"> 运行参数文件 </el-checkbox>
    </div>
    <div>
      <p>选择下载内容的格式</p>
      <el-radio v-model="dType" label="json"> JSON 格式 </el-radio>
      <el-radio v-model="dType" label="yaml"> YAML 格式 </el-radio>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="downloadVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="onDownload">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'nuxt-property-decorator'
import { Workflow } from 'cwl-svg'

@Component
export default class ToolDownload extends Vue {
  @InjectReactive('graph')
  graph!: Workflow

  downloadVisible = false
  dMain = true
  dJob = true
  dType = 'yaml'

  async onDownload(): Promise<void> {
    if (!this.dMain && !this.dJob) {
      return
    }
    await this.$emit('action-emit-event', 'toolDownload')
  }
}
</script>
