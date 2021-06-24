<template>
  <div class="a-us-container">
    <section class="header-banner el-row el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>关于我们</h1>
        <p>
          专业的生物信息知识库，提供系统的生物信息知识检索与学习途径，在这里，你可以 尽情查阅NGS，医学统计学，科研绘图等技术文档与教程。 速查速得。
        </p>
      </div>
    </section>
    <section>
      <div class="section-title">
        <h1>团队介绍</h1>
      </div>
      <div class="container">
        <div class="el-row el-row--flex is-justify-space-around">
          <div v-for="item in 4" :key="item" class="el-col el-col-6 m-b-2 text-center">
            <el-image style="width: 100px; height: 100px" src="/images/banner.jpg" fit="cover"></el-image>
            <h3 class="pro-title m-y-1">
              <strong>云计算</strong>
            </h3>
            <div class="pro-content">
              多种生物信息分析加速方案<br />
              高通量分布式计算框架<br />
              任务运行监控系统
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg inset">
      <div class="section-title">
        <h1>发展历程</h1>
      </div>
      <div class="container" style="width: 600px">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </section>
    <section>
      <div class="section-title">
        <h1>合作伙伴</h1>
      </div>
      <div class="container">
        <div class="el-row el-row--flex is-justify-space-around">
          <div v-for="item in 5" :key="item" class="el-col el-col-auto m-b-2 text-center">
            <el-image style="width: 200px; height: 100px" src="/images/banner.jpg" fit="cover"></el-image>
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
.header-banner {
  background-color: #146161;
  color: var(--light_grey);
}
</style>
