<template>
  <el-header>
    <div class="navbar-header el-row--flex nav-darken">
      <div class="navbar el-col-equal">
        <div class="navbar-logo">
          <nuxt-link to="/application" class="logo">
            <logo-svg class="logo-svg" />
          </nuxt-link>
        </div>
      </div>
      <!--      <div class="el-col-equal">-->
      <!--        <el-menu-->
      <!--          :default-active="$route.path"-->
      <!--          :router="true"-->
      <!--          mode="horizontal"-->
      <!--          background-color="#545c64"-->
      <!--          text-color="#fff"-->
      <!--          active-text-color="#ffd04b"-->
      <!--          ><el-menu-item index="/application/u-project">我的项目</el-menu-item>-->
      <!--        </el-menu>-->
      <!--      </div>-->
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
        <template v-if="loggedIn">
          <el-submenu index="1" popper-class="nav-darken">
            <div slot="title">{{ username }}</div>
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
  import LogoSvg from '@/components/LogoSvg'
  export default {
    name: 'AppNavigation',
    components: {
      LogoSvg,
    },
    computed: {
      ...mapGetters(['username', 'loggedIn']),
    },
    methods: {
      ...mapActions(['logout']),
    },
  }
</script>
