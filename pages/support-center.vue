<template>
  <div class="s-center-container">
    <section class="section-banner el-row is-align-middle el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>帮助中心</h1>
        <p>
          专业的生物信息知识库，提供系统的生物信息知识检索与学习途径，在这里，你可以
          尽情查阅NGS，医学统计学，科研绘图等技术文档与教程。 速查速得。
        </p>
      </div>
    </section>
    <section>
      <el-container>
        <el-aside width="240px">
          <h2>帮助文档</h2>
          <el-menu class="menu-normal" @select="onSelect">
            <el-submenu index="1">
              <template slot="title">
                <span>帮助一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <span slot="title">帮助二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">帮助三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">帮助四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <h2>{{ markdown.title }}</h2>
          <div class="content" v-html="markdown.body"></div>
        </el-main>
      </el-container>
    </section>
  </div>
</template>

<script type="text/babel">
  export default {
    layout: 'IndexLayout',
    async asyncData({ app }) {
      const markdown = await app.$axios.$get('/README.md')
      return { markdown }
    },
    methods: {
      async onSelect() {
        // eslint-disable-next-line no-console
        console.log(arguments)
        this.markdown = await this.$axios.$get('/README.md')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .section-banner {
    padding: 3rem 0;
    background-color: #2f5c8a;
    min-height: 20vh;
    height: 240px;
    color: var(--light_grey);
  }

  .el-aside {
    padding: 20px;
  }

  .el-menu {
    border-right: none;
  }

  .el-container {
    padding-bottom: 50px;
  }
</style>
