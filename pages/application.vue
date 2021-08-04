<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  scrollToTop: true,
  layout: 'AppLayout',
})
export default class application extends Vue {}
</script>
