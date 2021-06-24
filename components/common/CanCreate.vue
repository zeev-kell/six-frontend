<script type="text/babel">
// 可以创建
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
