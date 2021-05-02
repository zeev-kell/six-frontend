<template>
  <div class="s-center-container">
    <section class="header-banner el-row el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>帮助中心</h1>
        <p>
          生物医疗数据处理云平台，提供系统的生物信息知识检索，数据处理算法下载、在线组合、自动
          生成功能，以及一站式生信解决方案的本地化部署服务。
        </p>
      </div>
    </section>
    <section>
      <el-container>
        <el-aside width="240px" class="aside-wrap">
          <div class="aside-wrap__scroll">
            <div class="aside-wrap__inner">
              <h2>帮助文档</h2>
              <el-menu class="menu-normal" :default-active="$route.path" :router="true">
                <el-menu-item v-for="menu in menus" :key="menu.key" :index="'/support-center/' + menu.key">
                  <span slot="title">{{ menu.text }}</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
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

  .aside-wrap {
    position: sticky;
    height: 100%;
    top: 60px;
  }

  .aside-wrap__scroll {
    max-height: 100%;
    overflow-y: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: hsla(0, 0%, 0%, 0.32);
    }

    &:hover {
      scrollbar-color: hsla(231, 99%, 66%, 1);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: hsla(231, 99%, 66%, 1);
    }
  }
</style>
