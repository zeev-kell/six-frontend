<template>
  <section v-once id="section-product" class="section-product">
    <div class="section-title">
      <h1>云协作解决方案</h1>
    </div>
    <div class="container">
      <div class="el-row el-row--flex is-justify-space-around">
        <div class="el-col-auto m-b-2 text-center pro-panel el-col-sm-12">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/pipes')" custom>
            <div class="pointer" @click="navigate" @keypress.enter="navigate">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <span class="fa-stack fa-3x text-primary">
                    <fa :icon="sixSquare" class="fa-stack-2x" />
                    <fa icon="arrow-circle-down" class="fa-stack-1x fa-inverse" />
                  </span>
                  <i class="arrow-circle-down" />
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>软件下载</strong>
                </h3>
                <div class="pro-content">
                  即下即用，打开就用！<br />
                  低学习成本，<br />
                  省去本地化反复<br />
                  易出错设置，为你的学习和<br />
                  使用加速度。
                </div>
              </el-card>
            </div>
          </nuxt-link>
        </div>
        <div class="el-col-auto m-b-2 text-center pro-panel el-col-sm-12">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/graph-info/new')" custom>
            <div class="pointer" @click="navigate" @keypress.enter="navigate">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <span class="fa-stack fa-3x text-primary">
                    <fa :icon="sixSquare" class="fa-stack-2x" />
                    <fa icon="cubes" class="fa-stack-1x fa-inverse" />
                  </span>
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>流程协作</strong>
                </h3>
                <div class="pro-content">
                  通过拖拽单个软件，<br />
                  智能组合生成数据处理工作流。
                </div>
              </el-card>
            </div>
          </nuxt-link>
        </div>
        <div class="el-col-auto m-b-2 text-center pro-panel">
          <a :href="RESOURCES_URL + '/data/'" target="_blank" class="a-link">
            <div class="pointer">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <span class="fa-stack fa-3x text-primary">
                    <fa :icon="sixSquare" class="fa-stack-2x" />
                    <fa icon="chart-line" class="fa-stack-1x fa-inverse" />
                  </span>
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>数据协作</strong>
                </h3>
                <div class="pro-content">
                  创建，分享，校验数据！ <br />
                  提供标准的 <br />
                  生物医疗共享数据集，<br />
                  助力算法开发，评测，与学习。
                </div>
              </el-card>
            </div>
          </a>
        </div>
        <div class="el-col-auto m-b-2 text-center pro-panel">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/docs')" custom>
            <div class="pointer" @click="navigate" @keypress.enter="navigate">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <span class="fa-stack fa-3x text-primary">
                    <fa :icon="sixSquare" class="fa-stack-2x" />
                    <fa icon="lightbulb" class="fa-stack-1x fa-inverse" />
                  </span>
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>知识协作</strong>
                </h3>
                <div class="pro-content">
                  创建，共享，审阅知识！ <br />
                  提供系统的<br />
                  生物医疗数据处理知识<br />
                  涵盖NGS，统计学，科研绘图等技术文档。
                </div>
              </el-card>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { sixSquare } from '@/components/sixSquare'

@Component
export default class IndexProduct extends Vue {
  RESOURCES_URL = process.env.RESOURCES_URL

  get sixSquare() {
    return sixSquare
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/variables';
@import './assets/element-ui-build/mixins';

.pointer {
  height: 100%;
}

.pro-card {
  background-color: transparent;
  border: 1px solid transparent;
  transition: transform 0.2s;
  cursor: pointer;
  width: 240px;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    border: 1px solid #ebeef5;
  }
}

.pro-icon {
  margin-bottom: 40px;
  margin-top: 20px;
  color: $theme-color;
}

.pro-content {
  margin-top: 30px;
  margin-bottom: 30px;
}

// 小于 768px
@include res(xs-only, $--breakpoints-spec) {
  .index-banner {
    background-position-x: 40%;
  }
  #section-product {
    .pro-card {
      width: 100%;

      &:hover {
        transform: translateY(0);
        border: transparent;
      }
    }

    .pro-icon {
      margin-bottom: 20px;
    }

    .pro-content {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .el-col-auto {
      width: 50%;
    }

    .container > .el-row--flex {
      flex-wrap: wrap;
    }
  }
}
</style>
