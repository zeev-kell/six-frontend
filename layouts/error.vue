<template>
  <div class="error-page container">
    <p class="nav-white" style="box-shadow: none">
      <logo-png />
    </p>
    <div style="margin-top: 20px">
      <div v-if="error.statusCode === 401">
        <p><b style="">401.</b> 抱歉，您没有权限访问该资源。</p>
      </div>
      <div v-if="error.statusCode === 404">
        <p><b style="">404.</b> 抱歉，您访问的资源不存在。</p>
        <p>可能是网址有误，或者对应的内容被删除。</p>
      </div>
      <div v-else>
        <p><b style="">500.</b> 抱歉，发生了异常。</p>
        <p>您可以尝试刷新页面或者重新打开。</p>
      </div>
      <p>
        <nuxt-link class="logo" :to="localePath('/')"> 返回主页 </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LogoPng from '../components/LogoPng.vue'

@Component({
  components: { LogoPng },
})
export default class Error extends Vue {
  @Prop({ required: true })
  error: any
}
</script>
<style>
.error-page {
  margin: 5% auto 0;
  max-width: 400px;
  padding: 10px;
  position: relative;
}
</style>
