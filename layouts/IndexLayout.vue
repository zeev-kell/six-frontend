<template>
  <div :class="[`body-${bodyClass}`]">
    <index-navigation />
    <Nuxt />
    <index-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import IndexFooter from '@/components/IndexFooter.vue'
import IndexNavigation from '@/components/IndexNavigation.vue'
const systemModule = namespace('system')

@Component({
  components: { IndexFooter, IndexNavigation },
})
export default class IndexLayout extends Vue {
  @systemModule.State('bodyClass')
  bodyClass!: string
}
</script>
