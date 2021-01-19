<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <el-container class="app-container">
      <app-navigation />
      <el-main>
        <Nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import AppNavigation from '@/components/AppNavigation'
  export default {
    components: { AppNavigation },
    middleware: ['auth'],
  }
</script>
