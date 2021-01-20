<template>
  <div class="index-container">
    <section class="section-banner el-row is-align-middle el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>生物医疗大数据服务</h1>
        <p>
          专业的生物信息知识库，提供系统的生物信息知识检索与学习途径，在这里，你可以
          尽情查阅NGS，医学统计学，科研绘图等技术文档与教程。 速查速得。
        </p>
        <el-button>知识库</el-button>
        <el-button plain type="primary pass">数据集</el-button>
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
    <section class="section-product bg">
      <div class="section-title">
        <h1>解决方案</h1>
      </div>
      <div class="container">
        <div class="el-row el-row--flex is-justify-space-around">
          <div v-for="item in 4" :key="item" class="el-col el-col-6 pro-panel">
            <div class="pro-icon">
              <i class="el-icon-files"></i>
            </div>
            <h3 class="pro-title">云计算协助工具</h3>
            <div class="pro-content">
              多种生物信息分析加速方案<br />
              高通量分布式计算框架<br />
              任务运行监控系统
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-cooperation shadow">
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
              <h2>深圳华大基因科技服务有限公司</h2>
              <p class="text-justify">
                基因组解码计划是践行华大“基因科技造福人类”愿景的重要举措，我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。GeneDock作为行业领先的组学数据技术提供商，具有高效稳定数据处理能力和切合客户场景的完整解决方案，是我们强有力的支持者和伙伴。双方优势互补，在短短3个月内构建起了连接多个地域测序中心的智能云端测序数据生产线，相信双方此次合作将产生行业最具性价比的解决方案，加速实现人人了解自己基因组序列的目标。
              </p>
              <p class="text-right">——华大科技总经理 高强 博士</p>
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
  .section-banner {
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

  .pro-panel {
    text-align: center;
    margin-bottom: 50px;
  }

  .pro-icon {
    font-size: 80px;
    color: $theme-color;
  }

  .pro-title {
    margin: 1rem 0;
    font-weight: 700;
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
