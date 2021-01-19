<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <el-container class="is-vertical">
      <index-navigation />
      <el-main>
        <Nuxt />
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import IndexNavigation from '@/components/IndexNavigation'
  export default {
    components: { IndexNavigation },
  }
</script>
