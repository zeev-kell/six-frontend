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
        <el-button plain type="primary pass">云计算协作</el-button>
      </div>
    </section>
    <section class="section-product">
      <div class="section-title">
        <h1>解决方案</h1>
      </div>
      <div class="container">
        <div class="el-row el-row--flex is-justify-space-around">
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <nuxt-link tag="div" to="/application/pipes">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <i class="el-icon-files"></i>
                </div>
                <h3 class="pro-title mx-1r">
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
            </nuxt-link>
          </div>
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <a class="a-link">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <i class="el-icon-files"></i>
                </div>
                <h3 class="pro-title mx-1r">
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
            <a href="https://github.com/6-oclock/example-data" target="_blank" class="a-link">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <i class="el-icon-files"></i>
                </div>
                <h3 class="pro-title mx-1r">
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
                <h3 class="pro-title mx-1r">
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
  export default {
    layout: 'IndexLayout',
  }
</script>
<style lang="scss" scoped>
  .index-banner {
    background: url('/images/banner.jpg') no-repeat;
    background-size: cover;
    min-height: 100vh;
    height: 600px;
    color: var(--light_grey);
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
</style>
