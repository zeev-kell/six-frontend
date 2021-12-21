<template>
  <div :class="classes">
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  get classes(): string {
    return `body-${this.$store.state.system.bodyClass}`
  }
}
</script>
