<template>
  <el-dialog title="下载文件" :append-to-body="true" :visible.sync="dialogVisible" center class="el-dialog-dark">
    <div>
      <p>选择需要下载的内容</p>
      <el-checkbox v-model="dMain" :disabled="isOnlyCwlt"> 主文件 </el-checkbox>
      <el-checkbox v-model="dJob" :disabled="isOnlyCwlt"> 运行参数文件 </el-checkbox>
      <el-checkbox v-model="dCwlt" @change="onChangeCwlt"> cwlt格式 </el-checkbox>
    </div>
    <div>
      <p>选择下载内容的格式</p>
      <el-radio v-model="dType" label="json"> JSON 格式 </el-radio>
      <el-radio v-model="dType" label="yaml" :disabled="isOnlyCwlt"> YAML 格式 </el-radio>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
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
  dialogVisible = false
  isOnlyCwlt = false
  dMain = true
  dJob = true
  dCwlt = false
  dType = 'yaml'

  onDownload(): void {
    if (!this.dMain && !this.dJob && !this.dCwlt) {
      return
    }
    this.toolEvent(GraphEvent.TriggerGraphDownload, this.dType, this.dMain, this.dJob, this.dCwlt)
    this.dialogVisible = false
  }
  onChangeCwlt($event: boolean): void {
    if ($event) {
      this.dMain = false
      this.dJob = false
      this.dType = 'json'
      this.isOnlyCwlt = true
    } else {
      this.isOnlyCwlt = false
    }
  }
}
</script>
