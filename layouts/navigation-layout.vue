<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <el-container class="full-body">
      <el-header style="padding: 0">
        <header-navigation></header-navigation>
      </el-header>
      <el-main class="main">
        <Nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss">
  @import '../node_modules/normalize.css/normalize.css';
  @import '../assets/scss/theme.scss';
  @import '../assets/scss/layout.scss';
</style>
