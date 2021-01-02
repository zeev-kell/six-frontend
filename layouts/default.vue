<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <Nuxt />
  </div>
</template>
<style lang="scss">
  @import '../node_modules/normalize.css/normalize.css';
  @import '../assets/scss/theme.scss';
  @import '../assets/scss/layout.scss';
</style>
