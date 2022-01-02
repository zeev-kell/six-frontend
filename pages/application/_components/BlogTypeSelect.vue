<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ConstantsSelect from '@/pages/application/_components/ConstantsSelect.vue'
import { blogConstants } from '@/constants/BlogConstants'

@Component
export default class BlogTypeSelect extends ConstantsSelect {
  defaultPlaceholder = '请选择文档类型'
  typeList = blogConstants.getItemsList('TYPE_')
}
</script>
