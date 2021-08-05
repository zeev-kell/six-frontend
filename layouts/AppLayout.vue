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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppNavigation from '@/components/AppNavigation.vue'

@Component({
  components: { AppNavigation },
  // 使用 auth 中间健作为登录的判断跳转
  middleware: ['auth'],
})
export default class AppLayout extends Vue {}
</script>
