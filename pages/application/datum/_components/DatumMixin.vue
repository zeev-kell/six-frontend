<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import ElTabRouter from '@/pages/application/_components/ElTabRouter.vue'
import DatumMiddlewareMixin from '@/pages/application/datum/_components/DatumMiddlewareMixin.vue'
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'
import { datumConstants } from '@/constants/DatumConstants'

@Component({
  scrollToTop: true,
  filters: {
    datumTypeTranslate: datumConstants.get,
  },
  computed: {
    ...mapGetters({
      isFormat: 'datum/isFormat',
      isData: 'datum/isData',
      isDataPackage: 'datum/isDataPackage',
      username: 'user/username',
    }),
  },
})
export default class DatumMixin extends mixins(ElTabRouter, DatumMiddlewareMixin, DatumItemMixin) {}
</script>
