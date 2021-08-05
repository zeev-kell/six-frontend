<template>
  <el-header id="header" class="nav-app">
    <div class="navbar-header el-row--flex">
      <div class="navbar">
        <div class="navbar-logo">
          <nuxt-link class="logo" :to="localePath('/')">
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
        >
          <el-menu-item :index="localePath('application-pipes')">主页</el-menu-item>
        </el-menu>
      </div>
      <el-menu
        :default-active="$route.path"
        :router="true"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <li role="menuitem" tabindex="-1" class="el-menu-item menu-link">
          <nuxt-link v-slot="{ href }" :to="localePath('/support-center')" custom>
            <a target="_blank" :href="href">帮助中心</a>
          </nuxt-link>
        </li>
        <template v-if="loggedIn">
          <el-submenu index="1" popper-class="nav-app">
            <span slot="title" class="y-baseline">{{ username }}</span>
            <li role="menuitem" tabindex="-1" class="el-menu-item" @click="ACTION_LOGOUT">注销</li>
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

<script lang="ts">
import { Component, Vue, namespace, Action } from 'nuxt-property-decorator'
import LogoPng from '@/components/LogoPng.vue'
const userModule = namespace('user')

@Component({
  components: {
    LogoPng,
  },
})
export default class AppNavigation extends Vue {
  @userModule.Getter('username')
  username: string
  @userModule.Getter('loggedIn')
  loggedIn: boolean
  @Action('ACTION_LOGOUT')
  ACTION_LOGOUT: () => void
}
</script>

<style scoped lang="scss">
@import './assets/scss/variables';
@import '/node_modules/element-theme-chalk/src/mixins/mixins';

#header.nav-app ::v-deep {
  color: white;
  .el-menu .el-menu-item {
    color: white;
    background-color: $nav-darken-bg;
    &:hover,
    &:focus {
      color: white;
      background-color: $nav-darken-bg-over;
    }
  }
}
</style>

<style lang="scss">
@import './assets/scss/variables';
.nav-app {
  color: white;
  .el-menu .el-menu-item {
    color: white;
    background-color: $nav-darken-bg;
    &:hover,
    &:focus {
      color: white;
      background-color: $nav-darken-bg-over;
    }
  }
}
</style>
