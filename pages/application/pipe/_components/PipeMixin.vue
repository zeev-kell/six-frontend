<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import ElTabRouter from '@/pages/application/_components/ElTabRouter.vue'
import PipeMiddlewareMixin from '@/pages/application/pipe/_components/PipeMiddlewareMixin.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import { pipeConstants } from '@/constants/PipeConstants'

@Component({
  scrollToTop: true,
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  computed: {
    ...mapGetters({
      // isApp: 'pipe/isSoftware',
      // isWork: 'pipe/isOperation',
      username: 'user/username',
    }),
  },
})
export default class PipeMixin extends mixins<ElTabRouter>(ElTabRouter, PipeMiddlewareMixin, PipeItemMixin) {}
</script>
