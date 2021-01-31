<template>
  <footer class="footer text-center" :style="style">
    <div v-if="withSubscribe" class="py-2r bg inset">
      <div class="container">
        <h2><span>Six<span>O</span>'clock</span> 电子报刊</h2>
        <p>将最新的新闻发送到您的收件箱，这由 Six O'clock 团队策划。</p>
        <el-form class="el-row el-row--flex is-justify-center">
          <el-form-item style="min-width: 300px">
            <el-input placeholder="请输入邮箱">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="pt-2r">
      <div class="container">
        <ul class="list-unstyled">
          <li><a>GitHub 仓库</a></li>
          <li><a>实例</a></li>
          <li><a>优站精选</a></li>
          <li>
            <nuxt-link to="/about-us" tag="a">关于我们</nuxt-link>
          </li>
        </ul>
        <p id="copyright" class="copyright">©2021 Six O'clock <a>粤ICP 备1500xxxx号-1</a></p>
      </div>
    </div>
  </footer>
</template>

<script type="text/babel">
  export default {
    name: 'IndexFooter',
    props: {
      withSubscribe: {
        default: true,
        type: Boolean,
      },
    },
    computed: {
      style() {
        return this.withSubscribe ? '' : 'box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, 0.1)'
      },
    },
  }
</script>

<style lang="scss">
  footer .bg {
    background: rgba(248, 250, 252, 1);
  }

  footer .list-unstyled li {
    display: inline-block;

    & + li {
      margin-left: 1rem;
    }
  }

  footer .copyright {
    text-align: center;
    font-size: 14px;
    font-weight: 100;
    padding-top: 1rem;
    padding-bottom: 2rem;
    margin: 0;
  }
</style>
