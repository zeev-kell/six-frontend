<template>
  <section class="index-banner el-row is-align-middle el-row--flex">
    <div class="el-col-20 el-col-offset-2 el-col-sm-10 el-col-offset-sm-4 text-center">
      <h1 class="m-b-2 f-48">生物医疗大数据服务</h1>
      <div class="mb-20">
        <nuxt-link v-slot="{ navigate }" :to="localePath('index') + '#section-product'" custom>
          <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 云计算协作 </el-button>
        </nuxt-link>
        <docs-link to="/guide/">
          <el-button class="m-l-1 bloc">开始体验 </el-button>
        </docs-link>
      </div>
      <div class="search-wrap mb-50">
        <el-input v-model="searchInput" style="max-width: 450px" placeholder="提供1000+种工具和知识" @keyup.enter.native="toSearch">
          <el-select slot="prepend" v-model="searchType" placeholder="请选择" style="width: 80px">
            <el-option label="工具" value="0" />
            <el-option label="流程" value="1" />
            <el-option label="文档" value="2" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
      </div>
      <p style="line-height: 1.5">
        生物医疗数据处理云平台，创建，使用，分享，团队协作。提供海量数据处理算法下载、可视化编辑与配置，在线流程组合、自动生成功能，以及基于解耦合的一站式生信解决方案私有云的本地化部署服务。
      </p>
    </div>
    <div class="down-btn-wrap">
      <div style="padding: 10px; cursor: pointer" @click="scrollToNext()">
        <div class="down-btn" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import scrollTop from '@/utils/animate-scroll'
import DocsLink from '@/components/common/DocsLink.vue'

@Component({
  components: { DocsLink },
})
export default class IndexBanner extends Vue {
  searchInput = ''
  searchType = '0'

  scrollToNext() {
    const height = (document.querySelector('.index-banner') as HTMLElement).offsetHeight
    scrollTop(height)
  }
  toSearch() {
    const name = this.searchInput.trim()
    if (name) {
      if (this.searchType === '2') {
        this.$I18nRouter.push({
          path: '/application/docs',
          query: {
            name,
          },
        })
      } else {
        this.$I18nRouter.push({
          path: '/application/pipes',
          query: {
            name,
            type: this.searchType,
          },
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/variables';
@import './assets/element-ui-build/mixins';

.index-banner {
  background: url('/images/banner-3.webp') no-repeat;
  background-size: cover;
  min-height: 100vh;
  height: 600px;
  color: #333333;
  position: relative;
}

.search-wrap .el-select .el-input {
  width: 80px;
}

.down-btn-wrap {
  position: absolute;
  bottom: 10%;
  width: 100%;
  animation: shake 1s;
  animation-iteration-count: infinite;
  display: flex;
  justify-content: center;
}

.down-btn {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-right: 2px solid #333333;
  border-bottom: 2px solid #333333;
  transform: rotate(45deg);
}

// 小于 768px
@include res(xs-only, $--breakpoints-spec) {
  .f-48 {
    font-size: 2em;
  }
}

@keyframes shake {
  0%,
  20%,
  53%,
  80%,
  to {
    transform: translate(0);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  40%,
  43% {
    transform: translateY(-10px);
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }

  70% {
    transform: translateY(-5px);
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }

  90% {
    transform: translateY(-4px);
  }
}
</style>
