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
          <el-menu-item :index="localePath('application-pipes')"> 主页 </el-menu-item>
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
          <docs-link to="/">帮助中心</docs-link>
        </li>
        <template v-if="loggedIn">
          <el-submenu index="1" popper-class="nav-app">
            <template slot="title" class="v-baseline">{{ username }}</template>
            <el-menu-item :index="localePath('application-u-center')" class="el-menu-center">
              <span class="el-icon-user"></span>
              帐号设置
            </el-menu-item>
            <li role="menuitem" tabindex="-1" class="el-menu-item el-menu-center" @click="ACTION_LOGOUT">
              <span class="feather icon-log-out"></span>
              退出登录
            </li>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item index="/register"> 注册 </el-menu-item>
          <el-menu-item index="/login"> 登录 </el-menu-item>
        </template>
      </el-menu>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import LogoPng from '@/components/LogoPng.vue'
import DocsLink from '@/components/common/DocsLink.vue'

const UserNamespace = namespace('user')

@Component({
  components: {
    DocsLink,
    LogoPng,
  },
})
export default class AppNavigation extends Vue {
  @UserNamespace.Getter('username')
  username!: string
  @UserNamespace.Getter('loggedIn')
  loggedIn!: boolean
  @UserNamespace.Action('ACTION_LOGOUT')
  ACTION_LOGOUT!: () => void
}
</script>

<style scoped lang="scss">
@import './assets/scss/variables';

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
