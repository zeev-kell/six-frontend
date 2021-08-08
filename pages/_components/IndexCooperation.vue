<template>
  <section v-once class="section-cooperation">
    <div class="section-title">
      <h1>合作案例</h1>
    </div>
    <div class="container">
      <div v-for="item in 4" :key="item" class="el-row el-row--flex">
        <div class="el-col el-col-12" :class="item % 2 ? '' : 'order-2'">
          <div class="cooperation-image" />
        </div>
        <div class="el-col el-col-12">
          <div class="c-text">
            <h2>深圳市盐田街道办人民医院</h2>
            <p class="text-justify">
              基因组解码计划是践行造福人类愿景的重要举措， 我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。
              基因组解码计划是践行造福人类愿景的重要举措， 我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。
              基因组解码计划是践行造福人类愿景的重要举措， 我们要集合业内优秀力量，共同推进基因科技在医疗健康领域落地和应用。
            </p>
            <p class="text-right">—— 基因科技总经理 刘 博士</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class IndexCooperation extends Vue {}
</script>

<style scoped lang="scss" rel="stylesheet">
.cooperation-image {
  height: 100%;
  background: url('/images/banner.jpg') no-repeat;
}

.section-cooperation .el-row + .el-row {
  margin-top: 50px;
}

.c-text {
  padding: 30px;
  line-height: 1.5;
}
</style>
