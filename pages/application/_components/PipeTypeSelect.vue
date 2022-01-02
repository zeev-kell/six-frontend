<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import ConstantsSelect from '@/pages/application/_components/ConstantsSelect.vue'

@Component
export default class PipeTypeSelect extends ConstantsSelect {
  defaultPlaceholder = '请选择应用类型'
  typeList = pipeConstants.getItemsList('TYPE_')
}
</script>
