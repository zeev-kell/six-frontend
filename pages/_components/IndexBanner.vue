<template>
  <section class="index-banner el-row is-align-middle el-row--flex">
    <div class="el-col-20 el-col-offset-2 el-col-sm-8 el-col-offset-sm-4 text-center">
      <h1 class="m-b-2">生物医疗大数据服务</h1>
      <div class="mb-20">
        <a href="#section-product">
          <el-button plain type="primary pass">云计算协作</el-button>
        </a>
        <a href="http://www.sixoclock.net/support-center/get_started" target="_blank" class="m-l-1">
          <el-button>开始体验</el-button>
        </a>
      </div>
      <div class="search-wrap mb-20">
        <el-input v-model="searchInput" placeholder="提供1000+种工具和知识" @keyup.enter.native="toSearch">
          <el-select slot="prepend" v-model="searchType" placeholder="请选择">
            <el-option label="工具" value="0"></el-option>
            <el-option label="流程" value="1"></el-option>
          </el-select>
        </el-input>
      </div>
      <p style="line-height: 1.5">生物医疗数据处理云平台，提供数据处理算法下载、在线组合、自动 生成功能，以及一站式生信解决方案的本地化部署服务。</p>
    </div>
    <div class="down-btn-wrap">
      <div style="padding: 10px; cursor: pointer" @click="scrollToNext()">
        <div class="down-btn"></div>
      </div>
    </div>
    <el-backtop :visibility-height="400"></el-backtop>
  </section>
</template>

<script type="text/babel">
import scrollTop from '@/utils/animate-scroll'

export default {
  name: 'IndexBanner',
  data() {
    return {
      searchInput: '',
      searchType: '0',
    }
  },
  methods: {
    scrollToNext() {
      const height = document.querySelector('.index-banner').offsetHeight
      scrollTop(document.documentElement, height)
    },
    toSearch() {
      const name = this.searchInput.trim()
      if (name) {
        this.$I18nRouter.push({
          path: '/application/pipes',
          query: {
            name,
            type: this.searchType,
          },
        })
      }
    },
  },
}
</script>

<style lang="scss">
.index-banner {
  background: url('/images/banner-3.png') no-repeat;
  background-size: cover;
  min-height: 100vh;
  height: 600px;
  // color: var(--light_grey);
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
