<template>
  <el-header id="header" class="nav-fixed" :class="headerClass">
    <!-- desktop -->
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
          <el-menu-item :index="localePath('index')">
            {{ $t('nav.index') }}
          </el-menu-item>
          <el-submenu index="null" popper-class="nav-menu-item" class="no-active">
            <template slot="title">
              {{ $t('nav.product') }}
            </template>
            <li role="menuitem" class="el-menu-item">
              <nuxt-link v-slot="{ navigate }" :to="localePath('index') + '#section-product'" custom>
                <a @click="navigate" @keypress.enter="navigate">云协作</a>
              </nuxt-link>
            </li>
            <el-menu-item :index="localePath('graph-info-new')"> 流程组合 </el-menu-item>
            <el-menu-item :index="localePath('application-data')"> 数据库 </el-menu-item>
            <el-menu-item :index="localePath('application-docs')"> 知识库 </el-menu-item>
          </el-submenu>
          <el-menu-item :index="localePath('download-center')">
            {{ $t('nav.download') }}
          </el-menu-item>
          <li role="menuitem" tabindex="0" class="el-menu-item el-menu-item-blank">
            <docs-link to="/" class="a-link" style="vertical-align: baseline">帮助中心</docs-link>
          </li>
          <li role="menuitem" tabindex="0" class="el-menu-item el-menu-item-blank">
            <a href="https://github.com/6-oclock" target="_blank" class="a-link" style="vertical-align: baseline">
              {{ $t('nav.about') }}
            </a>
          </li>
        </el-menu>
      </div>
      <div class="el-col-auto hidden-sm-and-down">
        <client-only>
          <el-menu mode="horizontal">
            <li v-if="!username" class="el-menu-item menu-link" role="menuitem">
              <nuxt-link :to="localePath('access-register')">
                {{ $t('nav.register') }}
              </nuxt-link>
            </li>
            <li v-if="!username" class="el-menu-item menu-link" role="menuitem">
              <nuxt-link :to="localePath('access')">
                {{ $t('nav.login') }}
              </nuxt-link>
            </li>
            <el-dropdown v-else class="el-submenu" placement="bottom-end" @command="ACTION_LOGOUT()">
              <nuxt-link v-slot="{ navigate }" :to="localePath('application')" custom>
                <div class="el-submenu__title" @click="navigate">
                  {{ username }}
                  <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                </div>
              </nuxt-link>
              <el-dropdown-menu slot="dropdown" :visible-arrow="false">
                <el-dropdown-item>
                  <span class="feather icon-log-out"></span>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu>
        </client-only>
      </div>
      <!-- mobile 切换开关 -->
      <div class="el-col-auto d-flex is-align-middle hidden-md-and-up">
        <ul class="el-menu--horizontal el-menu">
          <li class="el-menu-item menu-link" role="menuitem">
            <nuxt-link :to="localePath('access')">
              {{ username || $t('nav.login') }}
            </nuxt-link>
          </li>
          <li class="el-menu-item menu-link" role="menuitem">
            <a @click="showMobileMenu = true">
              <fa icon="bars" class="fa-2x" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- mobile -->
    <div class="nav-wrap" :class="{ active: showMobileMenu }">
      <div class="d-flex flex-justify-end border-bottom">
        <button type="button" class="el-dialog__headerbtn" @click="showMobileMenu = false">
          <i class="el-dialog__close el-icon el-icon-close" />
        </button>
      </div>
      <el-menu :default-active="$route.path" :router="true">
        <el-menu-item :index="localePath('index')">
          {{ $t('nav.index') }}
        </el-menu-item>
        <el-submenu index="null" popper-class="nav-menu-item" class="no-active">
          <template slot="title">
            {{ $t('nav.product') }}
          </template>
          <li role="menuitem" class="el-menu-item">
            <a :href="localePath('index') + '#section-product'" @click="showMobileMenu = false">云协作</a>
          </li>
          <el-menu-item :index="localePath('graph-info-new')"> 流程组合 </el-menu-item>
          <el-menu-item :index="localePath('application-data')"> 数据库 </el-menu-item>
          <el-menu-item :index="localePath('application-docs')"> 知识库 </el-menu-item>
        </el-submenu>
        <el-menu-item :index="localePath('download-center')">
          {{ $t('nav.download') }}
        </el-menu-item>
        <li role="menuitem" tabindex="0" class="el-menu-item el-menu-item-blank">
          <docs-link to="/" class="a-link" style="vertical-align: baseline">{{ $t('nav.help') }}</docs-link>
        </li>
        <li role="menuitem" tabindex="0" class="el-menu-item el-menu-item-blank">
          <a href="https://github.com/6-oclock" target="_blank" class="a-link"> {{ $t('nav.about') }}</a>
        </li>
        <li class="el-menu-item menu-link d-flex is-justify-space-around">
          <client-only>
            <nuxt-link v-if="!username" :to="localePath('access-register')">
              {{ $t('nav.register') }}
            </nuxt-link>
            <nuxt-link v-if="!username" :to="localePath('access')">
              {{ $t('nav.login') }}
            </nuxt-link>
            <nuxt-link v-else :to="localePath('application')">
              {{ username }}
            </nuxt-link>
          </client-only>
        </li>
      </el-menu>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue, Watch, Action } from 'nuxt-property-decorator'
import LogoPng from '@/components/LogoPng.vue'
import DocsLink from '@/components/common/DocsLink.vue'

@Component({
  components: {
    DocsLink,
    LogoPng,
  },
})
export default class IndexNavigation extends Vue {
  showMobileMenu = false
  SCROLL_TRANSPORT = 100
  headerClass = ['nav-white']
  get username() {
    return this.$store.getters['user/username']
  }

  @Watch('$route.name')
  onWatchRouteName() {
    this.$nextTick(this.onWindowScroll)
    this.showMobileMenu = false
  }

  @Action('user/ACTION_LOGOUT')
  ACTION_LOGOUT!: () => void

  onWindowScroll() {
    const header = document.querySelector('#header') as HTMLElement
    if (!header) {
      return
    }
    if (this.getRouteBaseName() === 'index') {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
      this.headerClass = ['nav-white']
    } else {
      const scrollTop = document.documentElement.scrollTop
      const scrollPercent = scrollTop <= this.SCROLL_TRANSPORT ? scrollTop / 140 : 0.96
      header.style.backgroundColor = 'rgba(255, 255, 255,' + scrollPercent + ')'
      scrollTop >= this.SCROLL_TRANSPORT ? (this.headerClass = ['nav-white']) : (this.headerClass = [])
    }
  }
  goAnchor(selector: string) {
    // 最好加个定时器给页面缓冲时间
    setTimeout(() => {
      // 获取锚点元素
      document.querySelector(selector)?.scrollIntoView()
    }, 300)
  }
  beforeMount(): void {
    const header = document.querySelector('#header') as HTMLElement
    if (!header) {
      return
    }
    if (this.getRouteBaseName() !== 'index') {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0)'
      this.headerClass = []
    }
  }
  mounted() {
    this.onWindowScroll()
    window.addEventListener('scroll', this.onWindowScroll, true)
    if (window.location.hash) {
      this.goAnchor(window.location.hash)
    }
  }
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll, true)
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .is-child-active {
    border-bottom-color: #409eff !important;
  }
  .no-active .el-submenu__title {
    border-bottom: none !important;
  }
  .nav-wrap {
    height: 100vh;
    position: fixed;
    width: 280px;
    top: 0;
    right: 0;
    background: #ffffff;
    transform: translate(100%);
    transition: all 0.5s ease 0s;
    &.active {
      transform: translate(0, 0);
    }
    > .d-flex {
      height: 59px;
      background: rgb(250, 251, 252);
      border-bottom: 1px solid #eeeeee;
    }
    .el-menu-item,
    .el-submenu__title,
    .el-submenu {
      border-bottom: 1px solid #eeeeee;
    }
  }
}
#header.nav-fixed ::v-deep {
  width: 100%;
  z-index: 1001;
  position: fixed;
  left: 0;
  right: 0;
  padding: 0;
  color: #fff;

  .el-menu {
    background-color: transparent;
  }
  .el-menu-item,
  .el-dropdown,
  .el-submenu__title {
    color: inherit;
    background-color: transparent;
  }
  .el-submenu__title i {
    color: inherit;
  }
}
#header.nav-white ::v-deep {
  color: var(--s-theme-color--dark);
  box-shadow: 0 0 2px #e4e4e4;
  .el-menu .el-menu-item:hover,
  .el-menu .el-menu-item:focus {
    color: var(--s-theme-color--dark);
  }
}
</style>
<style>
.nav-menu-item a {
  width: 100%;
  display: inline-block;
}
.nav-menu-item a,
.nav-menu-item .el-menu-item {
  color: inherit;
  text-decoration: none;
}
</style>
