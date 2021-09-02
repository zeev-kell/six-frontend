<template>
  <el-dialog title="产品使用协议" :visible.sync="visible" center top="5vh" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
    <div v-marked="userAgreement" v-loading="loadingUA" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" style="width: 200px" @click="visible = false"> 确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import marked from '@/directives/marked/marked'

@Component({
  directives: {
    ...marked,
  },
})
export default class UserAgreement extends Vue {
  @Prop({ required: true, default: false })
  value!: boolean

  showUAVisible = false
  userAgreement = null
  loadingUA = false

  get visible(): boolean {
    return this.value
  }
  set visible(value) {
    this.$emit('input', value)
  }

  @Watch('visible', { immediate: true })
  async onWatchValue(visible: boolean): Promise<void> {
    if (visible && this.userAgreement === null) {
      this.loadingUA = true
      const response = await axios.get('/user-agreement.md')
      this.userAgreement = response.data
      this.loadingUA = false
    }
  }
}
</script>
