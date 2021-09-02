<template>
  <div v-once class="logo-wrap el-row--flex is-align-middle">
    <img src="/images/logo-white.png" class="logo-white" alt="six-o-clock" />
    <img src="/images/logo-black.png" class="logo-black" alt="six-o-clock" />
    <span>六点了技术</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class LogoPng extends Vue {}
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  height: 100%;
  width: auto;
  margin-right: 10px;
}
.logo-black {
  display: none;
}
.logo-wrap {
  font-size: 18px;
  height: 30px;
  font-weight: bold;
  margin-top: 15px;
  color: inherit;
}
</style>

<style lang="scss">
.nav-white {
  .logo-white {
    display: none;
  }
  .logo-black {
    display: inline-block;
  }
}
</style>
