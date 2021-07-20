<script type="text/babel">
// 检查是否可以创建
import CheckPermission from '@/components/common/CheckPermission'

export default {
  name: 'CanCreate',
  mixins: [CheckPermission],
  data() {
    return {
      verification: 4,
    }
  },
}
</script>
