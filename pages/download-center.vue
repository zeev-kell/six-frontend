<template>
  <div class="d-center-container">
    <section class="header-banner el-row el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>相关下载</h1>
        <p>生物医疗数据处理云平台，提供数据处理算法下载、在线组合、自动 生成功能，以及一站式生信解决方案的本地化部署服务。</p>
      </div>
    </section>
    <section>
      <div class="section-border">
        <h1>客户端软件</h1>
        <h3 class="sub-title">一键配置平台软件运行环境的安装程序</h3>
        <div class="download-btn">
          <el-dropdown @command="openMsg">
            <el-button type="primary" size="download"> 免费下载安装程序 </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="installer"> windows 版安装程序 </el-dropdown-item>
              <el-dropdown-item command="_linux"> linux 版安装程序 </el-dropdown-item>
              <el-dropdown-item command="installer-offline"> windows版安装程序离线包 </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </section>
    <section class="bg">
      <div class="section-title" style="padding: 20px 0">
        <h2>开始体验</h2>
      </div>
      <div class="container" style="width: 840px; padding-bottom: 60px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/clients_02-1.webp" alt="" />
              </div>
              <h3 class="text-center">python包</h3>
              <p class="text-justify">在python中运行下载自软件仓库的软件与流程</p>
              <a href="https://pypi.org/project/sixrunr/" target="_blank" class="no-underline">
                <el-button type="primary" class="el-button--block">去下载</el-button>
              </a>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/appstore_03-1.webp" alt="" />
              </div>
              <h3 class="text-center">软件仓库</h3>
              <p class="text-justify">查找并下载需要的数据处理软件<br />&nbsp;</p>
              <nuxt-link v-slot="{ navigate }" :to="localePath('/application/pipes')" custom>
                <el-button type="primary" class="el-button--block" @click="navigate" @keypress.enter="navigate"> 登录系统 </el-button>
              </nuxt-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/pipline_03-1.webp" alt="" />
              </div>
              <h3 class="text-center">使用处理数据</h3>
              <p class="text-justify">运行下载自软件仓库的流程处理本地数据</p>
              <docs-link to="/">
                <el-button type="primary" class="el-button--block">阅读教程 </el-button>
              </docs-link>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DocsLink from '@/components/common/DocsLink.vue'

const MSG: any = {
  installer: [
    '<div><p>链接：<a href="https://pan.baidu.com/s/1NccGp4VEr8YBoXcYUg73kQ" target="_blank">https://pan.baidu.com/s/1NccGp4VEr8YBoXcYUg73kQ</a></p><p>提取码：6666</p></div>',
    '运行环境安装器installer.exe',
  ],
  'installer-offline': [
    '<div><p>运行cwl必须的windows环境离线安装包</p><p>链接：<a href="https://pan.baidu.com/s/1QKelE0BfQF53ySFtfnD32A" target="_blank">https://pan.baidu.com/s/1QKelE0BfQF53ySFtfnD32A</a></p><p>提取码：6666</p></div>',
    '运行环境安装器installer.exe',
  ],
  sixrunr: [],
}

const description = '是平台的客户端软件，支持本地创建、运行、管理各类资源' + '（CWL格式软件，数据以及数据格式描述等）并与平台进行在线交互。'

@Component({
  components: { DocsLink },
  scrollToTop: true,
  layout: 'IndexLayoutScroll',
  head: {
    title: '下载中心--本地客户端软件',
    meta: [
      { hid: 'keywords', name: 'keywords', content: ',下载,平台软件运行环境,CWL' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', name: 'og:description', content: description },
    ],
  },
})
export default class DownloadCenterPage extends Vue {
  openMsg(type: string) {
    if (type === 'installer') {
      return
    }
    if (type === '_linux') {
      return
    }
    ;(this.$alert as any)(...MSG[type], { dangerouslyUseHTMLString: true })
  }
}
</script>

<style lang="scss" scoped>
.header-banner {
  background-color: #2e0077;
  color: var(--light_grey);
}

.download-btn {
  padding: 0 20px;
  width: 300px;
  margin: 0 auto;
  background-color: white;
}
.d-card {
  padding: 20px 0;

  ::v-deep .el-card__header {
    border-bottom: none;
  }
  .img-fluid {
    width: 100%;
  }
}
</style>

<style lang="scss">
.el-dropdown-menu--download {
  width: 223px;
  .el-dropdown-menu__item:hover {
    color: #fff;
    background: #66b1ff;
    border-color: #66b1ff;
  }
}
</style>
