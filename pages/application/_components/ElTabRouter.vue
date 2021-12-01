<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class ElTabRouter extends Vue {
  activeTab = this.getRouteBaseName()
  @Watch('$route.params')
  onWatchParams(): void {
    this.$nextTick(() => {
      // 强制使当前 tab 切换到当前路由
      // 会触发 onBeforeLeave onAbort
      this.activeTab = this.getRouteBaseName()
    })
  }
  onBeforeLeave(activeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.$I18nRouter.push({ name: activeName, params: this.$route.params }, resolve, (...args) => {
        // 如果是相同的路由，onAbort 会被调用，这时候需要手动 resolve，让 tab 切换
        const activeTab = this.getRouteBaseName()
        if (activeTab === activeName) {
          resolve()
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(...args)
        }
      })
    })
  }
}
</script>
