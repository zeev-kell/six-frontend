<template>
  <div class="container-fluid">
    <div class="panel" style="border: none">
      <h3 class="text-center">云计算协助工具</h3>
      <el-row class="row-bg" justify="space-around" type="flex">
        <el-col :span="4">
          <div class="box-card" onclick="$nuxt.$router.push('pipe-line')">
            <h4>软件流程</h4>
            流程自动生成与下载
          </div>
        </el-col>
        <el-col :span="4">
          <div class="box-card" onclick="$nuxt.$router.push('pipes')">
            <h4>软件工具</h4>
            工具设置与下载
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
    <div class="panel public-panel">
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
    name: '',
  }
</script>

<style lang="scss" scoped>
  .box-card {
    height: 180px;
    background: #909399;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    h4 {
      margin-top: 0;
    }
    &:hover {
      background: #606266;
      color: #eeeeee;
    }
  }
  .public-panel {
    margin-top: 30px;
    padding: 10px 0 20px;
  }
</style>
