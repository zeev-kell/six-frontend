<template>
  <div v-if="permissions === 1">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import { mapGetters } from 'vuex'
  export default {
    name: 'HasDevelop',
    computed: {
      ...mapGetters(['permissions']),
    },
  }
</script>
