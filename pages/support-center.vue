<template>
  <div class="s-center-container">
    <section class="header-banner el-row el-row--flex">
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
            <el-menu-item v-for="menu in menus" :key="menu.key" :index="menu.key">
              <span slot="title">{{ menu.text }}</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <span>帮助一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <nuxt-child />
      </el-container>
    </section>
  </div>
</template>

<script type="text/babel">
  import menus from '@/pages/support-center/menus'
  export default {
    layout: 'IndexLayout',
    data() {
      return {
        menus,
      }
    },
    methods: {
      onSelect(title, list) {
        // eslint-disable-next-line no-console
        console.log(arguments)
        this.$router.push('/support-center/' + title)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .header-banner {
    background-color: #2f5c8a;
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
