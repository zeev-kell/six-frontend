<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CheckPermission from '@/components/common/CheckPermission.vue'

@Component
export default class CanCreate extends CheckPermission {
  // 检查是否可以审核
  verification = 8
}
</script>
