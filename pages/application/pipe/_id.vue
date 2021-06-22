<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script type="text/babel">
  export default {
    name: '',
    beforeRouteEnter(to, form, next) {
      console.log(1)
      next()
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
