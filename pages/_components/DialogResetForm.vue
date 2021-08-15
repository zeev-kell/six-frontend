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

  validateForm(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.$refs.ruleForm.validate((valid: boolean) => {
        valid ? resolve() : reject(valid)
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetFields(): void {}
}
</script>
