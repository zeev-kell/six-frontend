<template>
  <div class="d-center-container">
    <section class="header-banner el-row el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>相关下载</h1>
        <p>
          专业的生物信息知识库，提供系统的生物信息知识检索与学习途径，在这里，你可以
          尽情查阅NGS，医学统计学，科研绘图等技术文档与教程。 速查速得。
        </p>
      </div>
    </section>
    <section>
      <div class="section-border">
        <h1>Six O'clock runner</h1>
        <h3 class="sub-title">一键配置sixoclock平台软件运行环境的安装脚本</h3>
        <div class="download-btn">
          <el-dropdown split-button type="primary" trigger="click" size="download" :visible-arrow="false">
            下载windows版安装程序
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>下载windows版安装程序</el-dropdown-item>
              <el-dropdown-item>下载windows版安装程序</el-dropdown-item>
              <el-dropdown-item>下载windows版安装程序</el-dropdown-item>
              <el-dropdown-item>下载windows版安装程序</el-dropdown-item>
              <el-dropdown-item>下载windows版安装程序</el-dropdown-item>
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
                <img class="img-fluid" src="/images/coop-01.png" alt="" />
              </div>
              <h2 class="text-center">Sixoclock python包</h2>
              <p class="text-justify">在python中运行下载自sixoclock软件仓库的软件与流程</p>
              <el-button type="primary" class="block" @click="openMsg('installer.exe')">去下载</el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/coop-01.png" alt="" />
              </div>
              <h2 class="text-center">Sixoclock软件仓库</h2>
              <p class="text-justify">查找并下载需要的数据处理软件<br />&nbsp;</p>
              <nuxt-link to="/application/pipes" tag="div">
                <el-button type="primary" class="block">登录系统</el-button>
              </nuxt-link>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="d-card">
              <div slot="header">
                <img class="img-fluid" src="/images/coop-01.png" alt="" />
              </div>
              <h2 class="text-center">使用sixoclock处理数据</h2>
              <p class="text-justify">运行下载自sixoclock软件仓库的流程处理本地数据</p>
              <nuxt-link to="/support-center" tag="div">
                <el-button type="primary" class="block">阅读教程</el-button>
              </nuxt-link>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script type="text/babel">
  const MSG = {
    'installer.exe': [
      '<div><p>链接：<a href="https://pan.baidu.com/s/1NccGp4VEr8YBoXcYUg73kQ" target="_blank">https://pan.baidu.com/s/1NccGp4VEr8YBoXcYUg73kQ</a></p><p>提取码：6666</p></div>',
      'sixoclock运行环境安装器installer.exe',
    ],
  }
  export default {
    layout: 'IndexLayoutBase',
    methods: {
      openMsg(type) {
        this.$alert(...MSG[type], { dangerouslyUseHTMLString: true })
      },
    },
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

    /deep/ .el-card__header {
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
