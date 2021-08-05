<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  asyncData({ redirect, store }) {
    // 默认跳转到第一个文档
    const key = store.state.helpMenus[0]?.key || 'get_started'
    return redirect('/support-center/' + key)
  },
})
export default class IndexPage extends Vue {}
</script>
