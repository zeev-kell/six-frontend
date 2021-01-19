<template>
  <el-header>
    <div class="navbar-header el-row--flex app-header-menu">
      <div class="navbar el-col-equal">
        <div class="navbar-logo">
          <nuxt-link to="/application" class="logo">Six O'clock</nuxt-link>
        </div>
      </div>
      <el-menu
        :default-active="$route.path"
        :router="true"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        ><li role="menuitem" tabindex="-1" class="el-menu-item menu-link">
          <a href="/support-center" target="_blank">帮助中心</a>
        </li>
        <template v-if="username">
          <el-submenu index="1" popper-class="app-header-menu">
            <template slot="title">{{ username }}</template>
            <el-menu-item index="/application/u-center">用户中心</el-menu-item>
            <el-menu-item hidden index="/application/u-center/change-password">修改密码</el-menu-item>
            <el-menu-item hidden index="/application/u-center/authorization">修改密码</el-menu-item>
            <li role="menuitem" tabindex="-1" class="el-menu-item" @click="logout">注销</li>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item index="/register">注册</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
        </template>
      </el-menu>
    </div>
  </el-header>
</template>

<script type="text/babel">
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'AppNavigation',
    computed: {
      ...mapGetters(['username']),
    },
    methods: {
      ...mapActions(['logout']),
    },
  }
</script>
