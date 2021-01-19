<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <span>基本信息</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>
</template>

<script type="text/babel">
  export default {
    name: 'Information',
  }
</script>

<style scoped lang="scss"></style>
