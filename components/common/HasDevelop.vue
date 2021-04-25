<template>
  <div v-if="!role">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import { mapGetters } from 'vuex'
  export default {
    name: 'HasDevelop',
    computed: {
      ...mapGetters(['role']),
    },
  }
</script>
