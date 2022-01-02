<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ConstantsSelect from '@/pages/application/_components/ConstantsSelect.vue'
import { datumConstants } from '@/constants/DatumConstants'

@Component
export default class DatumTypeSelect extends ConstantsSelect {
  defaultPlaceholder = '请选择数据类型'
  typeList = datumConstants.getItemsList('TYPE_')
}
</script>
