<template>
  <el-container class="personal-box">
    <el-aside width="240px">
      <el-menu :default-active="$route.path" :router="true">
        <el-menu-item index="/application/u-center">
          <i class="el-icon-menu"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="/application/u-center/security">
          <i class="el-icon-document"></i>
          <span slot="title">账户安全</span>
        </el-menu-item>
        <el-menu-item index="/application/u-center/authorize">
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
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UCenterPage extends Vue {}
</script>

<style scoped lang="scss">
.menu {
  flex: 0 0 240px;
  width: 240px;
}
</style>
