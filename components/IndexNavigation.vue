<template>
  <el-header>
    <div class="navbar-header el-row--flex">
      <div class="navbar el-col-equal">
        <div class="navbar-logo">
          <nuxt-link class="logo" to="/">Six O'clock</nuxt-link>
        </div>
      </div>
      <el-menu :default-active="$route.name" :router="true" mode="horizontal">
        <el-menu-item index="/support-center">帮助中心</el-menu-item>
        <el-menu-item index="/about-us">关于我们</el-menu-item>
        <li class="el-menu-item menu-link" role="menuitem" tabindex="-1">
          <a href="/register" target="_blank">注册</a>
        </li>
        <li class="el-menu-item menu-link" role="menuitem" tabindex="-1">
          <a href="/login" target="_blank">登录</a>
        </li>
      </el-menu>
    </div>
  </el-header>
</template>

<script type="text/babel">
  export default {}
</script>
