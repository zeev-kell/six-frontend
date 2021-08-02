<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <el-container class="app-container">
      <app-navigation />
      <el-main style="padding: 0">
        <Nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import AppNavigation from '@/components/AppNavigation'
export default {
  components: { AppNavigation },
  // 使用 auth 中间健作为登录的判断跳转
  middleware: ['auth'],
}
</script>
