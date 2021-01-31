<template>
  <div class="index-container">
    <section class="index-banner el-row is-align-middle el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>生物医疗大数据服务</h1>
        <p>
          生物医疗数据处理云平台，提供系统的生物信息知识检索，数据处理算法下载、在线组合、自动
          生成功能，以及一站式生信解决方案的本地化部署服务。
        </p>
        <el-button>公共知识库</el-button>
        <el-button plain type="primary pass">云计算协作</el-button>
      </div>
    </section>
    <section class="section-challenge">
      <div class="section-title">
        <h1>精准医疗时代下制药行业的挑战和机遇</h1>
      </div>
      <div class="container">
        <el-carousel :interval="4000" arrow="never" height="480px" indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <div class="el-row el-row--flex is-align-middle">
              <div class="el-col el-col-12">
                <img src="/images/coop-01.png" />
              </div>
              <div class="el-col el-col-6 el-col-offset-1">
                <h2>生物医疗大数据服务</h2>
                <p style="line-height: 1.5">
                  专业的生物信息知识库，提供系统的生物信息知识检索与学习途径， 在这里，你可以
                  尽情查阅NGS，医学统计学，科研绘图等技术文档与教程。 速查速得。
                </p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <section class="section-product bg inset">
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
            <nuxt-link tag="div" to="/application/pipes">
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
            </nuxt-link>
          </div>
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <nuxt-link tag="div" to="/application/pipes">
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
            </nuxt-link>
          </div>
          <div class="el-col el-col-auto mb-2r text-center pro-panel">
            <nuxt-link tag="div" to="/application/pipes">
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
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section-cooperation">
      <div class="section-title">
        <h1>合作案例</h1>
      </div>
      <div class="container">
        <div v-for="item in 4" :key="item" class="el-row el-row--flex">
          <div class="el-col el-col-12" :class="item % 2 ? '' : 'order-2'">
            <div class="cooperation-image"></div>
          </div>
          <div class="el-col el-col-12">
            <div class="custom-right">
              <h2>深圳市盐田街道办人民医院</h2>
              <p class="text-justify">
                基因组解码计划是践行造福人类愿景的重要举措，
                我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。
                基因组解码计划是践行造福人类愿景的重要举措，
                我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。
                基因组解码计划是践行造福人类愿景的重要举措，
                我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。
              </p>
              <p class="text-right">—— 基因科技总经理 刘 博士</p>
            </div>
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

  .el-carousel {
    img {
      height: 360px;
      width: auto;
      margin: 60px 0 0 auto;
      display: block;
    }

    /deep/ .el-carousel__button {
      height: 4px;
      background-color: var(--s-theme-color);
    }
  }

  .pro-card {
    background-color: transparent;
    border: none;
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

  .cooperation-image {
    height: 100%;
    background: url('/images/banner.jpg') no-repeat;
  }

  .section-cooperation .el-row + .el-row {
    margin-top: 50px;
  }

  .custom-right {
    padding: 30px;
    line-height: 1.5;
  }
</style>
