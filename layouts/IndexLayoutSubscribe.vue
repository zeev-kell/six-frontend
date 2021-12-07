<template>
  <div :class="classes">
    <index-navigation />
    <Nuxt />
    <index-footer :with-subscribe="true" />
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import IndexFooter from '@/components/IndexFooter.vue'
import IndexNavigation from '@/components/IndexNavigation.vue'
import IndexLayout from '@/layouts/IndexLayout.vue'

@Component({
  components: { IndexFooter, IndexNavigation },
})
export default class IndexLayoutSubscribe extends IndexLayout {}
</script>
