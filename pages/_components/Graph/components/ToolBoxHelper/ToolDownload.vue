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
import { Component } from 'nuxt-property-decorator'
import ToolBoxHelper from '@/pages/_components/Graph/components/ToolBoxHelper/ToolBoxHelper'
import { GraphEvent } from '@/constants/GraphEvent'

@Component
export default class ToolDownload extends ToolBoxHelper {
  downloadVisible = false
  dMain = true
  dJob = true
  dType = 'yaml'

  onDownload(): void {
    if (!this.dMain && !this.dJob) {
      return
    }
    this.toolEvent(GraphEvent.TriggerDownload, this.dType, this.dMain, this.dJob)
    this.downloadVisible = false
  }
}
</script>
