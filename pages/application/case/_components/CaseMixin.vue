<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ElTabRouter from '@/pages/application/_components/ElTabRouter.vue'
import { caseConstants } from '@/constants/CaseConstants'
import CaseMiddlewareMixin from '@/pages/application/case/_components/CaseMiddlewareMixin.vue'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'

@Component({
  scrollToTop: true,
  filters: {
    caseTypeTranslate: caseConstants.get,
  },
})
export default class CaseMixin extends mixins<ElTabRouter>(ElTabRouter, CaseMiddlewareMixin, CaseItemMixin) {}
</script>
