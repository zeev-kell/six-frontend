<template>
  <client-only v-if="hadPermissive">
    <slot></slot>
  </client-only>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex'
export default {
  name: 'CheckPermission',
  computed: {
    ...mapGetters(['permissions']),
    hadPermissive() {
      return this.permissions & this.verification
    },
  },
}
</script>
