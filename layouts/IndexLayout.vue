<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <index-navigation />
    <Nuxt />
    <index-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import IndexFooter from '@/components/IndexFooter.vue'
import IndexNavigation from '@/components/IndexNavigation.vue'

@Component({
  components: { IndexFooter, IndexNavigation },
})
export default class IndexLayout extends Vue {}
</script>
