<template>
  <div :class="[`body-${$store.state.bodyClass}`]">
    <index-navigation />
    <Nuxt />
    <index-footer :with-subscribe="false" />
  </div>
</template>
<script>
import IndexFooter from '@/components/IndexFooter'
import IndexNavigation from '@/components/IndexNavigation'
export default {
  components: { IndexFooter, IndexNavigation },
}
</script>
