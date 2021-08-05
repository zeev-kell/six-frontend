<template>
  <section v-once>
    <div class="section-title">
      <h1>数据处理从未如此简单</h1>
      <div class="sub-title">你可以在Windows电脑、Linux系统、以及六点了网站上使用sixOClock</div>
    </div>
    <div class="container">
      <div class="el-row">
        <div class="el-col-md-12 el-col-md-offset-6 el-row el-row--flex text-center el-col-24">
          <div class="el-col-equal">
            <fa :icon="['fab', 'windows']" class="fa-4x"></fa>
          </div>
          <div class="el-col-equal">
            <fa :icon="['fab', 'linux']" class="fa-4x"></fa>
          </div>
          <div class="el-col-equal">
            <fa icon="desktop" class="fa-4x"></fa>
          </div>
        </div>
      </div>
      <div class="el-row mt-50">
        <div class="el-col-md-6 el-col-md-offset-9 text-center el-col-12 el-col-offset-6">
          <div class="el-row el-row--flex is-justify-space-around">
            <nuxt-link v-slot="{ navigate }" :to="localePath('application')" custom>
              <el-button type="primary" @click="navigate" @keypress.enter="navigate">使用</el-button>
            </nuxt-link>
            <nuxt-link v-slot="{ navigate }" :to="localePath('download-center')" custom>
              <el-button type="primary" @click="navigate" @keypress.enter="navigate">下载</el-button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexDownload extends Vue {}
</script>

<style lang="scss" scoped>
@import './assets/scss/variables';
@import '/node_modules/element-theme-chalk/src/mixins/mixins';
section {
  background: #f9f9f9;
  padding-bottom: 50px;
}
.section-title {
  margin-bottom: 40px;
}
.section-title h1 {
  font-size: 48px;
  color: #409eff;
}
.sub-title {
  text-align: center;
  color: #888888;
  font-weight: bold;
}
// 小于 768px
@include res(xs-only, $--breakpoints-spec) {
  .section-title h1 {
    font-size: 2em;
  }
}
</style>
