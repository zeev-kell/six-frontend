<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ConstantsSelect from '@/pages/application/_components/ConstantsSelect.vue'
import { caseConstants } from '@/constants/CaseConstants'

@Component
export default class CaseTypeSelect extends ConstantsSelect {
  defaultPlaceholder = '请选择案例类型'
  typeList = caseConstants.getItemsList('TYPE_')
}
</script>
