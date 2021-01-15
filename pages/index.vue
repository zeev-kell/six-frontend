<template>
  <el-container class="full-body">
    <el-header style="padding: 0">
      <header-navigation></header-navigation>
    </el-header>
    <el-main class="main">
      <nuxt-child></nuxt-child>
    </el-main>
  </el-container>
</template>

<script>
  export default {}
</script>
<style lang="scss">
  .main {
    flex: 1 1 100%;
  }
</style>
