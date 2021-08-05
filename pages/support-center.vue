<template>
  <div class="s-center-container">
    <section class="header-banner el-row el-row--flex">
      <div class="el-col-8 el-col-offset-4">
        <h1>帮助中心</h1>
        <p>生物医疗数据处理云平台，提供数据处理算法下载、在线组合、自动 生成功能，以及一站式生信解决方案的本地化部署服务。</p>
      </div>
    </section>
    <section>
      <el-container>
        <el-aside width="240px" class="aside-wrap">
          <aside-menu></aside-menu>
        </el-aside>
        <nuxt-child />
      </el-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AsideMenu from '@/pages/support-center/_components/AsideMenu.vue'

@Component({
  components: { AsideMenu },
  scrollToTop: true,
  layout: 'IndexLayout',
  middleware: ['support-menus'],
})
export default class SupportCenterPage extends Vue {}
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
  padding: 20px 0;
}
</style>
