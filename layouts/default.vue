<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <Nuxt />
  </div>
</template>
<style lang="scss">
  @import '../node_modules/normalize.css/normalize.css';
  @import '../assets/scss/element.scss';
  @import '../assets/scss/theme.scss';
</style>
