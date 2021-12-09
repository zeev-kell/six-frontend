<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DatumModel } from '@/types/model/Datum'

@Component
export default class DatumItemMixin extends Vue {
  get item(): DatumModel {
    return this.$store.state.datum
  }
}
</script>
