<template>
  <div class="aside-wrap__scroll">
    <div class="aside-wrap__inner">
      <h2 class="pl-20">帮助文档</h2>
      <el-menu class="support-menu" :default-active="$route.path" :router="true">
        <menu-item v-for="menu in menus" :key="menu.key" :menu="menu"></menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script type="text/babel">
import MenuItem from '@/pages/support-center/_components/MenuItem'
export default {
  name: 'AsideMenu',
  components: { MenuItem },
  computed: {
    menus() {
      return this.$store.state.helpMenus
    },
  },
}
</script>

<style scoped lang="scss" rel="stylesheet">
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

.support-menu ::v-deep {
  .is-active .el-submenu__title,
  .el-menu-item.is-active {
    font-weight: bold;
  }

  .is-active .el-submenu__title,
  .el-submenu__title:hover,
  .el-menu-item.is-active,
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: transparent;
    color: $theme-color;
  }
}
</style>
