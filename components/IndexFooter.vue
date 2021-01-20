<template>
  <footer class="footer">
    <div class="bg py-2r text-center">
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
    <div class="shadow">
      <div class="container">
        <div class="el-row el-row--flex">
          <nav class="el-col-equal">
            <h3>发现</h3>
            <ul class="list-unstyled">
              <li class="py-2"><a>我们团队</a></li>
              <li class="py-2"><a>设计套件</a></li>
              <li class="py-2"><a>联系我们</a></li>
            </ul>
          </nav>
          <nav class="el-col-equal text-center">
            <h3>发现</h3>
            <ul class="list-unstyled">
              <li class="py-2"><a>我们团队</a></li>
              <li class="py-2"><a>设计套件</a></li>
              <li class="py-2"><a>联系我们</a></li>
            </ul>
          </nav>
          <nav class="el-col-equal text-right">
            <h3>发现</h3>
            <ul class="list-unstyled">
              <li class="py-2"><a>我们团队</a></li>
              <li class="py-2"><a>设计套件</a></li>
              <li class="py-2"><a>联系我们</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <p id="copyright" class="copyright">©2021 Six O'clock <a>粤ICP 备1500xxxx号-1</a></p>
    </div>
  </footer>
</template>

<script type="text/babel">
  export default {
    name: 'IndexFooter',
  }
</script>

<style lang="scss">
  footer .bg {
    background: rgba(248, 250, 252, 1);
  }

  footer .copyright {
    text-align: center;
    font-size: 14px;
    font-weight: 100;
    padding-top: 30px;
    padding-bottom: 30px;
    margin: 0;
  }
</style>
