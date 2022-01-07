<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DatumModel } from '@/types/model/Datum'

@Component
export default class DatumItemMixin extends Vue {
  // TODO 优化成父子级数据结构，使用 @Inject 和 @Provide，减少 $store 的依赖
  get item(): DatumModel {
    return this.$store.state.datum
  }
}
</script>
