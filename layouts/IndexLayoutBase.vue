<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <index-navigation />
    <Nuxt />
    <index-footer :with-subscribe="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import IndexFooter from '@/components/IndexFooter'
import IndexNavigation from '@/components/IndexNavigation'

@Component({
  components: { IndexFooter, IndexNavigation },
})
export default class IndexLayoutBase extends Vue {}
</script>
