<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CaseContent, CaseModel } from '@/types/model/Case'

@Component
export default class CaseItemMixin extends Vue {
  get item(): CaseModel {
    return this.$store.state.case
  }
  get content(): CaseContent {
    return this.$store.getters['case/content']
  }
}
</script>
