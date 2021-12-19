<template>
  <client-only v-if="hadPermissive">
    <slot />
  </client-only>
</template>

<script lang="ts">
import { Component, Vue, Getter } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'

@Component
export default class CheckPermission extends Vue {
  @Prop({
    default() {
      return ''
    },
  })
  isUser!: string
  protected verification = 0
  get hadPermissive() {
    if (this.isUser !== ' ') {
      return this.isUser === this.username && this.permissions & this.verification
    }
    return this.permissions & this.verification
  }
  @Getter('user/permissions')
  permissions!: number
  @Getter('user/username')
  username!: string
}
</script>
