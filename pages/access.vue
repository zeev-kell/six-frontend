<template>
  <div class="container-fluid" style="padding: 1px">
    <nuxt-child class="access-container" />
    <canvas-particle />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CanvasParticle from '@/components/CanvasParticle.vue'
import Copyright from '@/components/Copyright.vue'

@Component({
  scrollToTop: true,
  components: {
    Copyright,
    CanvasParticle,
  },
  middleware: ['check-login'],
})
export default class AccessPage extends Vue {}
</script>

<style lang="scss">
.access-container {
  width: 400px;
  margin: 50px auto 0;
  > .box {
    padding: 30px 50px;
    background: #ffffff;
    position: relative;
    z-index: 1;
    border: 1px solid #eceff1;
    border-radius: 2px;
  }
}
</style>
