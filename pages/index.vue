<template>
  <div class="index-container">
    <section class="index-banner el-row is-align-middle el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>生物医疗大数据服务</h1>
        <p>
          生物医疗数据处理云平台，提供系统的生物信息知识检索，数据处理算法下载、在线组合、自动
          生成功能，以及一站式生信解决方案的本地化部署服务。
        </p>
        <a href="https://wiki-pre.sixoclock.net/" target="_blank"><el-button>公共知识库</el-button></a>
        <a href="#section-product">
          <el-button plain type="primary pass">云计算协作</el-button>
        </a>
      </div>
      <div class="down-btn-wrap">
        <div class="down-btn" @click="scrollToNext()"></div>
      </div>
    </section>
    <section id="section-product" class="section-product">
      <div class="section-title">
        <h1>解决方案</h1>
      </div>
      <div class="container">
        <div class="el-row el-row--flex is-justify-space-around">
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <nuxt-link v-slot="{ navigate }" to="/application/pipes" custom>
              <div class="pointer" @click="navigate" @keypress.enter="navigate">
                <el-card shadow="hover" class="pro-card">
                  <div class="pro-icon">
                    <i class="el-icon-files"></i>
                  </div>
                  <h3 class="pro-title my-1r">
                    <strong>软件下载</strong>
                  </h3>
                  <div class="pro-content">
                    提供即下即用的算法<br />
                    软件（免环境配置），<br />
                    并可通过在线配置<br />
                    软件参数，实现本地<br />
                    一键运行。
                  </div>
                </el-card>
              </div>
            </nuxt-link>
          </div>
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <a class="a-link">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <i class="el-icon-files"></i>
                </div>
                <h3 class="pro-title my-1r">
                  <strong>流程组合</strong>
                </h3>
                <div class="pro-content">
                  通过在线拖拽多个<br />
                  软件或流程的图标实现<br />
                  自动组合多个软件为<br />
                  一个新的流程。<br />
                </div>
              </el-card>
            </a>
          </div>
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <a :href="RESOURCES_URL + '/data/'" target="_blank" class="a-link">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <i class="el-icon-files"></i>
                </div>
                <h3 class="pro-title my-1r">
                  <strong>数据下载</strong>
                </h3>
                <div class="pro-content">
                  提供标准的生物医疗<br />
                  模拟数据集以用于<br />
                  软件测试与学习，公有<br />
                  参考数据集。<br />
                </div>
              </el-card>
            </a>
          </div>
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <a class="a-link" href="https://wiki-pre.sixoclock.net/" target="_blank">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <i class="el-icon-files"></i>
                </div>
                <h3 class="pro-title my-1r">
                  <strong>知识库</strong>
                </h3>
                <div class="pro-content">
                  提供系统的生物信息知识<br />
                  检索与学习资料，<br />
                  可尽情查阅NGS，医学统计学，<br />
                  科研绘图等技术<br />
                  文档与教程。
                </div>
              </el-card>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/babel">
  import scrollTop from '@/utils/animate-scroll'
  export default {
    layout: 'IndexLayout',
    data() {
      return {
        RESOURCES_URL: process.env.RESOURCES_URL,
      }
    },
    methods: {
      scrollToNext() {
        const height = document.querySelector('.index-banner').offsetHeight
        scrollTop(document.documentElement, height)
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import './assets/scss/variables';
  .index-banner {
    background: url('/images/banner-3.png') no-repeat;
    background-size: cover;
    min-height: 100vh;
    height: 600px;
    // color: var(--light_grey);
    color: #333333;
    position: relative;
  }

  .a-link {
    text-decoration: none !important;
  }

  .pro-card {
    background-color: transparent;
    border: 1px solid transparent;
    transition: transform 0.2s;
    cursor: pointer;
    width: 240px;
    &:hover {
      transform: translateY(-8px);
      border: 1px solid #ebeef5;
    }
  }

  .pro-icon {
    font-size: 80px;
    color: $theme-color;
  }

  .down-btn-wrap {
    position: absolute;
    bottom: 10%;
    width: 100%;
    animation: shake 1s;
    animation-iteration-count: infinite;
    display: flex;
    justify-content: center;
  }

  .down-btn {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(45deg);
  }

  @keyframes shake {
    0%,
    20%,
    53%,
    80%,
    to {
      transform: translate(0);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    40%,
    43% {
      transform: translateY(-10px);
      transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    }

    70% {
      transform: translateY(-5px);
      transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    }

    90% {
      transform: translateY(-4px);
    }
  }
</style>
