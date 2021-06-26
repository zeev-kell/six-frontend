<template>
  <el-header id="header" class="nav-fixed nav-darken">
    <div class="navbar-header el-row--flex">
      <div class="navbar el-col-equal">
        <div class="navbar-logo">
          <nuxt-link class="logo" :to="localePath('/')">
            <logo-png />
          </nuxt-link>
        </div>
      </div>
      <el-menu :default-active="$route.path" :router="true" mode="horizontal">
        <el-menu-item :index="localePath('download-center')">相关下载</el-menu-item>
        <el-menu-item :index="localePath('support-center')" :class="{ 'is-active': $route.name.startsWith('support-center') }">帮助中心</el-menu-item>
        <!-- <el-menu-item index="/about-us">关于我们</el-menu-item>-->
        <li class="el-menu-item menu-link" role="menuitem">
          <nuxt-link class="logo" :to="localePath('/register')">注册</nuxt-link>
        </li>
        <li class="el-menu-item menu-link" role="menuitem">
          <nuxt-link class="logo" :to="localePath('/login')">登录</nuxt-link>
        </li>
      </el-menu>
    </div>
  </el-header>
</template>

<script type="text/babel">
import LogoPng from '@/components/LogoPng'

const SCROLL_TRANSPORT = 100
export default {
  name: 'IndexNavigation',
  components: {
    LogoPng,
  },
  mounted() {
    this.onWindowScroll()
    window.addEventListener('scroll', this.onWindowScroll, true)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll, true)
  },
  methods: {
    onWindowScroll() {
      const header = document.querySelector('#header')
      if (this.getRouteBaseName() === 'index') {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
        header.classList.add('nav-white')
      } else {
        const scrollTop = document.documentElement.scrollTop
        const scrollPercent = scrollTop <= SCROLL_TRANSPORT ? scrollTop / 140 : 0.96
        header.style.backgroundColor = 'rgba(255, 255, 255,' + scrollPercent + ')'
        scrollTop >= SCROLL_TRANSPORT ? header.classList.add('nav-white') : header.classList.remove('nav-white')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.nav-fixed {
  width: 100%;
  z-index: 1001;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0;
  color: #fff;
}

::v-deep {
  .el-menu {
    background-color: transparent;
  }

  .el-menu-item {
    color: white;
    background-color: transparent !important;
  }
}
.is-active {
  border-bottom-color: #409eff !important;
}
</style>
