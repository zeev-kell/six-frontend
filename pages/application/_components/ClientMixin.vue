<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class ClientMixin extends Vue {
  @Prop({
    default() {
      return ''
    },
  })
  value!: any
  @Watch('value', { immediate: true })
  onWatchValue(value: any): void {
    this.content = value
  }
  content = ''
}
</script>
