<template>
  <div v-once class="logo-wrap el-row--flex is-align-middle">
    <span>LOGO</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class LogoPng extends Vue {}
</script>

<style lang="scss" scoped>
.logo-wrap {
  font-size: 18px;
  height: 30px;
  font-weight: bold;
  margin-top: 15px;
  color: inherit;
}
</style>
