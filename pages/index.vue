<template>
  <div class="index-container">
    <index-banner />
    <index-empowerment />
    <index-product />
    <index-download />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import IndexBanner from '@/pages/_components/IndexBanner.vue'
import IndexDownload from '@/pages/_components/IndexDownload.vue'
import IndexEmpowerment from '@/pages/_components/IndexEmpowerment.vue'
import IndexProduct from '@/pages/_components/IndexProduct.vue'

@Component({
  layout: 'IndexLayoutScroll',
  scrollToTop: true,
  components: {
    IndexDownload,
    IndexEmpowerment,
    IndexBanner,
    IndexProduct,
  },
})
export default class IndexPage extends Vue {}
</script>
