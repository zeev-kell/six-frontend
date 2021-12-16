<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

// 弹窗表单组件
@Component
export default class DialogResetForm extends Vue {
  $refs!: {
    ruleForm: HTMLFormElement
  }
  dialogVisible = false

  @Watch('dialogVisible')
  // 关闭窗口的时候重置 form 表单数据
  onWatchVisible(value: boolean): void {
    if (!value) {
      setTimeout(() => {
        this.$nextTick(() => {
          this.resetFields()
          this.$refs.ruleForm?.resetFields()
        })
      }, 500)
    }
  }

  async validateForm(): Promise<void> {
    await this.$refs.ruleForm.validate()
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetFields(): void {}
}
</script>
