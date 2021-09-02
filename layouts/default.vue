<template>
  <div :class="[`body-${$store.state.system.bodyClass}`]">
    <Nuxt />
  </div>
</template>
