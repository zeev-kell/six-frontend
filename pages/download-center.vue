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
        <h1>Sixoclock 客户端软件</h1>
        <h3 class="sub-title">一键配置sixoclock平台软件运行环境的安装程序</h3>
        <div class="download-btn">
          <el-dropdown @command="openMsg">
            <el-button type="primary" size="download"> 免费下载 Sixbox 安装程序 </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="installer"> windows 版安装程序 </el-dropdown-item>
              <el-dropdown-item command="sixbox_linux"> linux 版安装程序 </el-dropdown-item>
              <el-dropdown-item command="installer-offline"> windows版安装程序离线包 </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </section>
    <section class="bg">
      <div class="section-title" style="padding: 20px 0">
        <h2>开始体验 sixoclock</h2>
      </div>
      <div class="container" style="width: 840px; padding-bottom: 60px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/clients_02-1.webp" alt="" />
              </div>
              <h3 class="text-center">Sixoclock python包</h3>
              <p class="text-justify">在python中运行下载自sixoclock软件仓库的软件与流程</p>
              <a href="https://pypi.org/project/sixrunr/" target="_blank" class="no-underline">
                <el-button type="primary" class="block">去下载</el-button>
              </a>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/appstore_03-1.webp" alt="" />
              </div>
              <h3 class="text-center">Sixoclock软件仓库</h3>
              <p class="text-justify">查找并下载需要的数据处理软件<br />&nbsp;</p>
              <nuxt-link v-slot="{ navigate }" :to="localePath('/application/pipes')" custom>
                <el-button type="primary" class="block" @click="navigate" @keypress.enter="navigate"> 登录系统 </el-button>
              </nuxt-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/pipline_03-1.webp" alt="" />
              </div>
              <h3 class="text-center">使用sixoclock处理数据</h3>
              <p class="text-justify">运行下载自sixoclock软件仓库的流程处理本地数据</p>
              <docs-link to="/">
                <el-button type="primary" class="block">阅读教程 </el-button>
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
    'sixoclock运行环境安装器installer.exe',
  ],
  'installer-offline': [
    '<div><p>运行cwl必须的windows环境离线安装包</p><p>链接：<a href="https://pan.baidu.com/s/1QKelE0BfQF53ySFtfnD32A" target="_blank">https://pan.baidu.com/s/1QKelE0BfQF53ySFtfnD32A</a></p><p>提取码：6666</p></div>',
    'sixoclock运行环境安装器installer.exe',
  ],
  sixrunr: [],
}

@Component({
  components: { DocsLink },
  scrollToTop: true,
  layout: 'IndexLayoutBase',
  head: {
    title: '下载中心-六点了协作云',
  },
})
export default class DownloadCenterPage extends Vue {
  openMsg(type: string) {
    if (type === 'installer') {
      window.open(process.env.RESOURCES_URL + '/dist/latest/installer.exe')
      return
    }
    if (type === 'sixbox_linux') {
      window.open(process.env.RESOURCES_URL + '/dist/latest/Sixbox_linux64_latest.sh')
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
