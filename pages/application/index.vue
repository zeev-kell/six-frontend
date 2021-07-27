<template>
  <div class="container-fluid">
    <div class="card no-border">
      <h3 class="text-center">云计算协助工具</h3>
      <el-row class="row-bg" justify="space-around" type="flex">
        <el-col :span="4">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/pipes')" custom>
            <div class="box-card" @click="navigate" @keypress.enter="navigate">
              <h4>软件流程</h4>
              流程自动生成与下载
            </div>
          </nuxt-link>
        </el-col>
        <el-col :span="4">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/pipes')" custom>
            <div class="box-card" @click="navigate" @keypress.enter="navigate">
              <h4>软件工具</h4>
              工具设置与下载
            </div>
          </nuxt-link>
        </el-col>
        <el-col :span="4">
          <div class="box-card">
            <h4>Demo 数据</h4>
            提供各种软件流程练习与测试数据
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="card mt-30" style="padding-bottom: 15px">
      <h3 class="text-center">公共知识库</h3>
      <el-row class="row-bg" justify="space-around" type="flex">
        <el-col :span="4">
          <div class="box-card">
            <h4>软件流程</h4>
            流程自动生成与下载
          </div>
        </el-col>
        <el-col :span="4">
          <div class="box-card">
            <h4>软件流程</h4>
            流程自动生成与下载
          </div>
        </el-col>
        <el-col :span="4">
          <div class="box-card">
            <h4>软件流程</h4>
            流程自动生成与下载
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  asyncData({ redirect, app }) {
    // 现阶段默认直接进入列表
    redirect(app.localePath('/application/pipes'))
  },
}
</script>

<style lang="scss" scoped>
.box-card {
  height: 160px;
  background: #909399;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  padding: 15px;
  h4 {
    margin-top: 0;
  }
  &:hover {
    background: #606266;
    color: #eeeeee;
  }
}
</style>
