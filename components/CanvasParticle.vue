<template>
  <canvas class="canvas-particle" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Particle from '@/assets/js/particle'

@Component({
  data() {
    return {
      particle: undefined,
    }
  },
})
export default class CanvasParticle extends Vue {
  particle!: Particle

  beforeDestroy(): void {
    this.particle.destroy()
    window.removeEventListener('resize', this.particle.resize.bind(this.particle))
  }

  mounted(): void {
    this.particle = new Particle(this.$el, {
      drawType: ['circle'],
    })
    window.addEventListener('resize', this.particle.resize.bind(this.particle), false)
  }
}
</script>

<style lang="scss" scoped>
.canvas-particle {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}
</style>
