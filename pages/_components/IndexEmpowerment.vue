<template>
  <section id="section-empowerment">
    <div class="section-title">
      <h1>赋能工作和学习</h1>
    </div>
    <client-only>
      <div v-if="isMobile" class="container">
        <el-carousel height="250px">
          <el-carousel-item v-for="(item, index) of content2" :key="index">
            <div class="text-center">
              <div>
                <fa :icon="item.icon" class="fa-4x text-primary" />
              </div>
              <div>
                <h3 class="title">
                  {{ item.title }}
                </h3>
                <div class="content" v-html="item.content" />
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-if="!isMobile" class="container">
        <div v-for="(content_1, i) of content1" :key="i" class="el-row mb-50">
          <div v-for="(item, j) of content_1" :key="j" class="el-col-12 el-row">
            <div class="el-col-10 text-right image">
              <fa :icon="item.icon" class="fa-4x text-primary" />
            </div>
            <div class="el-col-14 text-left">
              <h3 class="title">
                {{ item.title }}
              </h3>
              <div class="content" v-html="item.content" />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </section>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
const systemModule = namespace('system')

@Component
export default class IndexEmpowerment extends Vue {
  content1 = [
    [
      {
        icon: 'archive',
        title: '开"箱"即用',
        content: '即下即用，打开就用！<br />低学习成本，省去本地化反复<br />易出错设置，<br />为你的学习和使用加速度。<br />助力数据科学~',
      },
      {
        icon: 'object-group',
        title: '智能多样化分析',
        content: '通过拖拽单个软件，<br />智能组合生成数据处理工作流。',
      },
    ],
    [
      {
        icon: 'id-card',
        title: '可视化定制化分析',
        content: '通过可视化界面，自由配置算法，<br />满足个性化分析需求。',
      },
      {
        icon: 'user-shield',
        title: '私有化本地安全部署',
        content: '本地批量部署，<br />基于数据安全的一站式数据挖掘私有云，<br />保证数据安全！',
      },
    ],
  ]
  get content2() {
    return [...this.content1[0], ...this.content1[1]]
  }
  @systemModule.State('isMobile')
  isMobile!: boolean
}
</script>

<style lang="scss" scoped>
.image {
  padding-top: 51px;
  padding-right: 50px;
}
.content {
  line-height: 1.5;
}
::v-deep {
  .el-carousel__indicator.is-active button {
    background: #333333;
  }
  .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    opacity: 0.8;
    background: rgb(239, 239, 239);
  }
}
</style>
