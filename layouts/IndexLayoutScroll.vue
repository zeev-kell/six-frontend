<template>
  <div :class="classes">
    <index-navigation :with-scroll="true" />
    <Nuxt />
    <index-footer />
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import IndexFooter from '@/components/IndexFooter.vue'
import IndexNavigation from '@/components/IndexNavigation.vue'
import DefaultLayout from '@/layouts/default.vue'

@Component({
  components: { IndexFooter, IndexNavigation },
})
export default class IndexLayoutScroll extends DefaultLayout {}
</script>
