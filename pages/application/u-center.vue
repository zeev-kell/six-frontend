<template>
  <el-container class="personal-box">
    <el-aside width="240px">
      <el-menu :default-active="$route.path" :router="true">
        <el-menu-item index="/application/u-center">
          <i class="el-icon-menu"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="/application/u-center/change-password">
          <i class="el-icon-document"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="/application/u-center/authorization">
          <i class="el-icon-setting"></i>
          <span slot="title">授权管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <nuxt-child />
    </el-main>
  </el-container>
</template>

<script type="text/babel">
  export default {}
</script>

<style scoped lang="scss">
  .menu {
    flex: 0 0 240px;
    width: 240px;
  }
</style>
