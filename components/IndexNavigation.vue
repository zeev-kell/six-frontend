<template>
  <el-header id="header" class="nav-fixed nav-darken">
    <div class="navbar-header el-row--flex pr-20">
      <div class="navbar el-col-auto">
        <div class="navbar-logo">
          <nuxt-link class="logo" :to="localePath('/')">
            <logo-png />
          </nuxt-link>
        </div>
      </div>
      <div class="el-col-equal">
        <el-menu :default-active="$route.path" :router="true" mode="horizontal" class="hidden-sm-and-down">
          <el-menu-item :index="localePath('index')">{{ $t('nav.index') }}</el-menu-item>
          <el-submenu index="index-product">
            <template slot="title">{{ $t('nav.product') }}</template>
            <li role="menuitem" class="el-menu-item custom-menu-item">
              <a href="#section-product">云协作</a>
            </li>
            <el-menu-item>流程组合</el-menu-item>
            <el-menu-item :index="localePath({ path: '/index?' })">数据库</el-menu-item>
            <el-menu-item :index="localePath('/application/docs')">知识库</el-menu-item>
          </el-submenu>
          <el-menu-item :index="localePath('download-center')">{{ $t('nav.download') }}</el-menu-item>
          <el-menu-item :index="localePath('support-center')" :class="{ 'is-active': $route.name.startsWith('support-center') }">
            {{ $t('nav.help') }}
          </el-menu-item>
          <el-menu-item>{{ $t('nav.about') }}</el-menu-item>
        </el-menu>
      </div>
      <div class="el-col-auto">
        <el-menu mode="horizontal">
          <li class="el-menu-item menu-link" role="menuitem">
            <nuxt-link :to="localePath('/register')">{{ $t('nav.register') }}</nuxt-link>
          </li>
          <li class="el-menu-item menu-link" role="menuitem">
            <nuxt-link :to="localePath('/login')">{{ $t('nav.login') }}</nuxt-link>
          </li>
        </el-menu>
      </div>
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
<style>
.custom-menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>
