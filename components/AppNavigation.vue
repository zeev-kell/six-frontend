<template>
  <el-header>
    <div class="navbar-header el-row--flex nav-darken">
      <div class="navbar">
        <div class="navbar-logo">
          <nuxt-link to="/" class="logo">
            <logo-png />
          </nuxt-link>
        </div>
      </div>
      <div class="el-col-equal">
        <el-menu
          :default-active="$route.path"
          :router="true"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          ><el-menu-item index="/application/pipes">主页</el-menu-item>
        </el-menu>
      </div>
      <el-menu :default-active="$route.path" :router="true" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        ><li role="menuitem" tabindex="-1" class="el-menu-item menu-link">
          <a href="/support-center" target="_blank">帮助中心</a>
        </li>
        <template v-if="loggedIn">
          <el-submenu index="1" popper-class="nav-darken">
            <span slot="title" class="y-baseline">{{ username }}</span>
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
import LogoPng from '@/components/LogoPng'
export default {
  name: 'AppNavigation',
  components: {
    LogoPng,
  },
  computed: {
    ...mapGetters(['username', 'loggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
  },
}
</script>
