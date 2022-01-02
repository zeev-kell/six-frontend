<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import ElTabRouter from '@/pages/application/_components/ElTabRouter.vue'
import PipeMiddlewareMixin from '@/pages/application/pipe/repository/_components/PipeRepositoryMiddlewareMixin.vue'
import PipeItemMixin from '@/pages/application/pipe/repository/_components/PipeRepositoryItemMixin.vue'
import { pipeConstants } from '@/constants/PipeConstants'

@Component({
  scrollToTop: true,
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  computed: {
    ...mapGetters({
      isApp: 'pipeRepository/isSoftware',
      isWork: 'pipeRepository/isOperation',
      username: 'user/username',
    }),
  },
})
export default class PipeMixin extends mixins<ElTabRouter>(ElTabRouter, PipeMiddlewareMixin, PipeItemMixin) {}
</script>
