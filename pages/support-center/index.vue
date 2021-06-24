<script type="text/babel">
export default {
  asyncData({ redirect, store }) {
    // 默认跳转到第一个文档
    const key = store.state.helpMenus[0]?.key || 'get_started'
    return redirect('/support-center/' + key)
  },
}
</script>
