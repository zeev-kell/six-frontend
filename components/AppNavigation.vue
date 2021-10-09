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
          <el-submenu v-create :index="localePath('application-u-creation')">
            <template slot="title">我的创作</template>
            <el-menu-item :index="localePath('application-u-creation-pipe')">我的应用</el-menu-item>
            <el-menu-item :index="localePath('application-u-creation-docs')">我的文档</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="el-col-auto">
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
            <el-dropdown class="el-submenu" @command="handleUserMenu">
              <div class="el-submenu__title">
                <el-avatar size="medium" src="/images/portrait.jpg"></el-avatar>
                {{ username }}
                <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
              </div>
              <el-dropdown-menu slot="dropdown" :visible-arrow="false" class="el-submenu-dropdown-menu">
                <el-dropdown-item command="application-u-center">
                  <span class="el-icon-user"></span>
                  帐号设置
                </el-dropdown-item>
                <el-dropdown-item divided command="ACTION_LOGOUT">
                  <span class="feather icon-log-out"></span>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <el-menu-item index="/access/register"> 注册 </el-menu-item>
            <el-menu-item index="/access"> 登录 </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import LogoPng from '@/components/LogoPng.vue'
import DocsLink from '@/components/common/DocsLink.vue'
import CanCreate from '@/components/common/CanCreate.vue'

const UserNamespace = namespace('user')

@Component({
  components: {
    CanCreate,
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
  handleUserMenu(e: string): void {
    switch (e) {
      case 'ACTION_LOGOUT':
        this.ACTION_LOGOUT()
        break
      default:
        this.$I18nRouter.push(e)
        break
    }
  }
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
