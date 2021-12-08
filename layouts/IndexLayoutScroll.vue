<template>
  <div :class="classes">
    <index-navigation :with-scroll="true" />
    <Nuxt />
    <index-footer />
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import IndexLayout from '@/layouts/IndexLayout.vue'
import IndexFooter from '@/components/IndexFooter.vue'
import IndexNavigation from '@/components/IndexNavigation.vue'

@Component({
  components: { IndexFooter, IndexNavigation },
})
export default class IndexLayoutScroll extends IndexLayout {}
</script>
