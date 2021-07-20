<script type="text/babel">
// 检查是否可以审核
import CheckPermission from '@/components/common/CheckPermission'

export default {
  name: 'CanExamine',
  mixins: [CheckPermission],
  data() {
    return {
      verification: 8,
    }
  },
}
</script>
