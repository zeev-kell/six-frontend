<template>
  <footer class="footer" :style="footerStyle">
    <div v-if="withSubscribe" class="p-y-2 bg inset text-center">
      <div class="container">
        <h2><span>Six<span>O</span>'clock</span> 电子报刊</h2>
        <p>将最新的新闻发送到您的收件箱，这由六点了技术团队策划。</p>
        <el-form class="el-row el-row--flex is-justify-center" @submit.native.prevent>
          <el-form-item style="min-width: 300px">
            <el-input placeholder="请输入邮箱">
              <el-button slot="append" icon="el-icon-search" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="py-40">
      <div class="container">
        <div class="el-row el-row-smd--flex">
          <div class="el-col-md-4 hidden-sm-and-down">
            <div class="title">六点了</div>
            <ul class="list-unstyled">
              <li><a href="https://github.com/" target="_blank">我们是谁</a></li>
              <li><a href="https://github.com/" target="_blank">历程</a></li>
              <li><a href="https://github.com/" target="_blank">关注我们</a></li>
              <li><a href="https://github.com/" target="_blank">联系我们</a></li>
              <li><a href="https://github.com/" target="_blank">加入我们</a></li>
            </ul>
          </div>
          <div class="el-col-md-4 hidden-sm-and-down">
            <div class="title">产品</div>
            <ul class="list-unstyled">
              <li>
                <nuxt-link :to="localePath('index') + '#section-product'">云协作</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('graph-info-new')">流程组合</nuxt-link>
              </li>
              <li>
                <a :href="RESOURCES_URL + '/data/'" target="_blank">数据集</a>
              </li>
              <li>
                <nuxt-link :to="localePath('application-blogs')">知识库</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="el-col-md-4 hidden-sm-and-down">
            <div class="title">下载中心</div>
            <ul class="list-unstyled">
              <li>
                <nuxt-link :to="localePath('download-center')">客户端下载</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('application-pipes')">软件仓库</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="el-col-md-4 hidden-sm-and-down">
            <div class="title">资源</div>
            <ul class="list-unstyled">
              <li>
                <docs-link to="/">帮助文档</docs-link>
              </li>
              <li>
                <docs-link to="/Q_A.html">常见Q&A</docs-link>
              </li>
              <li>
                <docs-link to="/Advice.html">意见建议</docs-link>
              </li>
              <li>
                <docs-link to="/guide/">使用指南</docs-link>
              </li>
              <li><a href="https://github.com/" target="_blank">更新日志</a></li>
              <li><a href="https://github.com/" target="_blank">NewSroom</a></li>
            </ul>
          </div>
          <div class="el-col-12 hidden-md-and-up">
            <div class="el-row text-center" style="line-height: 1.5">
              <div class="el-col-12">
                <nuxt-link :to="localePath('download-center')">下载中心</nuxt-link>
              </div>
              <div class="el-col-12">
                <docs-link to="/">资源</docs-link>
              </div>
              <div class="el-col-12">
                <a href="https://github.com/" target="_blank">关于我们</a>
              </div>
              <div class="el-col-12">
                <nuxt-link :to="localePath('index') + '#section-product'">产品</nuxt-link>
              </div>
            </div>
          </div>
          <div class="el-col-md-8 el-col-10 el-row text-center icon-wrap">
            <div class="el-col-8">
              <div class="icon">
                <fa icon="download" class="fa-2x" />
              </div>
              <div class="hidden-sm-and-down">
                <nuxt-link :to="localePath('download-center')">下载</nuxt-link>
              </div>
            </div>
            <div class="el-col-8">
              <div class="icon">
                <fa :icon="['fab', 'github']" class="fa-2x" />
              </div>
              <div class="hidden-sm-and-down">
                <a href="https://github.com/" target="_blank">GitHub 仓库</a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showUA">
          <user-agreement v-model="showUA"></user-agreement>
        </div>
        <p id="copyright" class="copyright">
          ©2021 六点了技术-为生物医疗健康提供最便捷的数据挖掘云平台
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021047962号-1&emsp;</a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030302001909">
            <img src="/images/beian.webp" alt="" />&nbsp;粤公网安备 44030302001909号
          </a>
          <a class="pointer" @click="showUA = true">服务协议</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import DocsLink from '@/components/common/DocsLink.vue'

@Component({
  components: {
    DocsLink,
    UserAgreement: () => import('@/pages/_components/UserAgreement.vue'),
  },
})
export default class IndexFooter extends Vue {
  // 是否含有订阅
  @Prop({ default: false })
  withSubscribe!: Boolean

  RESOURCES_URL = process.env.RESOURCES_URL
  showUA = false

  get footerStyle() {
    return this.withSubscribe ? '' : 'box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, 0.1)'
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/variables';
@import './assets/element-ui-build/mixins';

.title {
  color: #3c3c3c;
  padding: 0 50px;
}
.bg {
  background: rgba(248, 250, 252, 1);
}
.list-unstyled {
  border-right: 1px solid #cccccc;
  min-height: 120px;
  padding: 0 50px;
}
.list-unstyled li {
  display: block;
  margin-top: 12px;
  color: #101010;
  a {
    color: inherit;
  }
}
.copyright {
  text-align: center;
  font-size: 14px;
  font-weight: 100;
  margin: 0;
  padding: 20px 20px 0;
}

// 小于 768px
@include res(xs-only, $--breakpoints-spec) {
  .el-row-smd--flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon svg {
    font-size: 1.5em;
  }
}
// 大于等于 768px
@include res(sm-and-up, $--breakpoints-spec) {
  .icon-wrap {
    padding-top: 50px;
  }
  .icon {
    margin-bottom: 20px;
  }
  .copyright {
    padding-top: 50px;
  }
}
</style>
