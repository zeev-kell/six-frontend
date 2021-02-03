<template>
  <el-header id="header" class="nav-fixed nav-darken">
    <div class="navbar-header el-row--flex">
      <div class="navbar el-col-equal">
        <div class="navbar-logo">
          <nuxt-link class="logo" to="/">
            <logo-svg class="logo-svg" />
          </nuxt-link>
        </div>
      </div>
      <el-menu :default-active="$route.path" :router="true" mode="horizontal">
        <el-menu-item index="/download-center">相关下载</el-menu-item>
        <el-menu-item index="/support-center">帮助中心</el-menu-item>
        <!--        <el-menu-item index="/about-us">关于我们</el-menu-item>-->
        <li class="el-menu-item menu-link" role="menuitem">
          <a href="/register" target="_blank">注册</a>
        </li>
        <li class="el-menu-item menu-link" role="menuitem">
          <a href="/login" target="_blank">登录</a>
        </li>
      </el-menu>
    </div>
  </el-header>
</template>

<script type="text/babel">
  import LogoSvg from '@/components/LogoSvg'

  const SCROLL_TRANSPORT = 100
  export default {
    components: {
      LogoSvg,
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
        const scrollTop = document.documentElement.scrollTop
        const scrollPercent = scrollTop <= SCROLL_TRANSPORT ? scrollTop / 140 : 0.96
        const header = document.querySelector('#header')
        header.style.backgroundColor = 'rgba(255, 255, 255,' + scrollPercent + ')'
        scrollTop >= SCROLL_TRANSPORT ? header.classList.add('nav-white') : header.classList.remove('nav-white')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .nav-fixed {
    width: 100%;
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    padding: 0;
    color: #fff;
  }

  /deep/ {
    .el-menu {
      background-color: transparent;
    }

    .el-menu-item {
      color: white;
      background-color: transparent !important;
    }
  }
</style>
