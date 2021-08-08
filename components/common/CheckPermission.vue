<template>
  <client-only v-if="hadPermissive">
    <slot />
  </client-only>
</template>

<script lang="ts">
import { Component, Vue, Getter } from 'nuxt-property-decorator'

@Component
export default class CheckPermission extends Vue {
  protected verification = 0
  get hadPermissive() {
    return this.permissions & this.verification
  }
  @Getter('user/permissions')
  permissions!: number
}
</script>
