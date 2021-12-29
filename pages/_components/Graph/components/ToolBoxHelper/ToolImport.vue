<template>
  <el-dialog title="导入配置" :append-to-body="true" :visible.sync="dialogVisible" center class="el-dialog-dark">
    <div class="text-center" style="min-height: 200px">
      <p>选择要导入的JSON或YAML文件</p>
      <input type="file" />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ToolBoxHelper from '@/pages/_components/Graph/components/ToolBoxHelper/ToolBoxHelper'
import { GraphEvent } from '@/constants/GraphEvent'

@Component
export default class ToolDownload extends ToolBoxHelper {
  dialogVisible = false
  dMain = true
  dJob = true
  dType = 'yaml'

  onDownload(): void {
    if (!this.dMain && !this.dJob) {
      return
    }
    this.toolEvent(GraphEvent.TriggerGraphDownload, this.dType, this.dMain, this.dJob)
    this.dialogVisible = false
  }
}
</script>
