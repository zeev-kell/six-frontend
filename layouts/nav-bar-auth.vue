<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <el-container class="full-body">
      <el-header style="padding: 0">
        <header-navigation></header-navigation>
      </el-header>
      <el-main class="layout-main">
        <Nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss">
  @import '../node_modules/normalize.css/normalize.css';
  @import '../assets/scss/element.scss';
  @import '../assets/scss/theme.scss';
  @import '../assets/iconfont/iconfont.css';
</style>
<script>
  import HeaderNavigation from '@/components/HeaderNavigation'
  export default {
    components: { HeaderNavigation },
    middleware: ['auth'],
  }
</script>
