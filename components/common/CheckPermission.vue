<template>
  <client-only v-if="hadPermissive">
    <slot></slot>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CheckPermission extends Vue {
  protected verification = 0
  get hadPermissive() {
    return this.permissions & this.verification
  }
  get permissions() {
    return this.$store.getters.permissions
  }
}
</script>
