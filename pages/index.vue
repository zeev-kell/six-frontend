<template>
  <el-container class="full-body">
    <el-header style="padding: 0">
      <header-navigation></header-navigation>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import HeaderNavigation from '@/components/HeaderNavigation'
  export default {
    components: { HeaderNavigation },
  }
</script>
<style lang="scss">
  .main {
    flex: 1 1 100%;
  }
</style>
