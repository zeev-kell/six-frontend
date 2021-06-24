<template>
  <section class="section-challenge">
    <div class="section-title">
      <h1>精准医疗时代下制药行业的挑战和机遇</h1>
    </div>
    <div class="container">
      <el-carousel arrow="never" height="480px" :interval="4000" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="el-row el-row--flex is-align-middle">
            <div class="el-col el-col-12">
              <img src="/images/coop-01.png" alt="" />
            </div>
            <div class="el-col el-col-6 el-col-offset-1">
              <h2>生物医疗大数据服务</h2>
              <p style="line-height: 1.5">
                专业的生物信息知识库，提供系统的生物信息知识检索与学习途径， 在这里，你可以 尽情查阅NGS，医学统计学，科研绘图等技术文档与教程。
                速查速得。
              </p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<script type="text/babel">
export default {
  name: 'IndexChallenge',
}
</script>

<style scoped lang="scss" rel="stylesheet">
.el-carousel {
  img {
    height: 360px;
    width: auto;
    margin: 60px 0 0 auto;
    display: block;
  }

  ::v-deep .el-carousel__button {
    height: 4px;
    background-color: var(--s-theme-color);
  }
}
</style>
