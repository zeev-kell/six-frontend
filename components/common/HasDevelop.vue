<template>
  <client-only v-if="permissions === 1">
    <span class="promise-group">
      <slot></slot>
    </span>
  </client-only>
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

<style lang="scss">
  .promise-group .el-button + .el-button {
    margin-left: 0;
  }
</style>
