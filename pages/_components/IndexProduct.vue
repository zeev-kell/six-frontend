<template>
  <section id="section-product" class="section-product">
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
                    <fa icon="arrow-circle-down" class="fa-stack-1x fa-inverse"></fa>
                  </span>
                  <i class="arrow-circle-down"></i>
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
          <nuxt-link v-slot="{ navigate }" :to="localePath('/index')" custom>
            <div class="pointer" @click="navigate" @keypress.enter="navigate">
              <el-card shadow="hover" class="pro-card">
                <div class="pro-icon">
                  <span class="fa-stack fa-3x text-primary">
                    <fa :icon="sixSquare" class="fa-stack-2x" />
                    <fa icon="cubes" class="fa-stack-1x fa-inverse"></fa>
                  </span>
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>流程组合</strong>
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
                    <fa icon="chart-line" class="fa-stack-1x fa-inverse"></fa>
                  </span>
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>数据下载</strong>
                </h3>
                <div class="pro-content">
                  通过可视化界面，算法，<br />
                  满足个性化分析需求。
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
                    <fa icon="lightbulb" class="fa-stack-1x fa-inverse"></fa>
                  </span>
                </div>
                <h3 class="pro-title m-y-1">
                  <strong>知识库</strong>
                </h3>
                <div class="pro-content">
                  本地批量部署，<br />
                  基于数据安全一站式<br />
                  数据挖掘私有云，保证数据安全！
                </div>
              </el-card>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/babel">
import { sixSquare } from '@/components/sixSquare'
export default {
  name: 'IndexProduct',
  data() {
    return {
      RESOURCES_URL: process.env.RESOURCES_URL,
    }
  },
  computed: {
    sixSquare() {
      return sixSquare
    },
  },
}
</script>

<style lang="scss" scoped>
@import './assets/scss/variables';
@import '/node_modules/element-theme-chalk/src/mixins/mixins';

.a-link {
  text-decoration: none !important;
}

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
