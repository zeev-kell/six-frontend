<template>
  <div class="navbar-header el-row--flex">
    <div class="navbar navbar__left">
      <div class="navbar-logo"><nuxt-link to="/" class="logo">Six O'clock</nuxt-link>></div>
    </div>
    <el-menu :default-active="$route.name" :router="true" mode="horizontal">
      <el-menu-item index="/support-center">帮助中心</el-menu-item>
      <el-menu-item index="/about-us">关于我们</el-menu-item>
      <el-menu-item index="/register">注册</el-menu-item>
      <el-menu-item index="/login">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'HeaderNavigation',
  }
</script>

<style lang="scss" scoped>
  .navbar-header {
    border-bottom: solid 1px #e6e6e6;
    background-color: #545c64;
  }

  .navbar__left {
    flex: 1 1 auto;
  }

  .navbar-logo {
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    > .logo {
      display: inline-block;
      padding: 0 20px;
      color: var(--light_grey);
      text-decoration: none;
      &:visited {
        color: var(--light_grey);
      }
    }
  }
  /deep/ {
    .el-menu {
      background: transparent;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu-item {
      color: white;
      &.is-active {
        color: rgb(255, 208, 75) !important;
        border-bottom-color: rgb(255, 208, 75) !important;
        background-color: rgb(84, 92, 100);
      }
    }
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
      background-color: rgb(67, 74, 80);
      color: white;
    }
  }
  .is-active {
    border-bottom: #ffd04b;
  }
</style>
