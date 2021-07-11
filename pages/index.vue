<template>
  <div class="index-container">
    <index-banner></index-banner>
    <index-empowerment></index-empowerment>
    <index-product></index-product>
    <index-download></index-download>
  </div>
</template>

<script type="text/babel">
import IndexBanner from '@/pages/_components/IndexBanner'
import IndexDownload from '@/pages/_components/IndexDownload'
import IndexEmpowerment from '@/pages/_components/IndexEmpowerment'
import IndexProduct from '@/pages/_components/IndexProduct'
export default {
  layout: 'IndexLayout',
  components: {
    IndexDownload,
    IndexEmpowerment,
    IndexBanner,
    IndexProduct,
  },
}
</script>
