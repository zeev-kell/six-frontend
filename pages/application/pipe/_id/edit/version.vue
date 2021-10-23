<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import PipeVersion from '@/pages/application/pipe/_id/index/version.vue'

@Component
export default class PipeEditVersion extends PipeVersion {
  get item() {
    return this.$store.state.pipe
  }
  get versions() {
    return this.item?.versions || []
  }
}
</script>
