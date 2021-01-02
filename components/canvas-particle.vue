<template>
  <canvas class="canvas-particle"></canvas>
</template>

<script type="text/babel">
  import Particle from '@/assets/js/particle'

  export default {
    name: 'CanvasParticle',
    data() {
      return {
        particle: undefined,
      }
    },
    mounted() {
      this.particle = new Particle(this.$el, {
        drawType: ['circle'],
      })
      window.addEventListener('resize', this.particle.resize.bind(this.particle), false)
    },
    beforeDestroy() {
      this.particle.destroy()
      window.removeEventListener('resize', this.particle.resize.bind(this.particle))
    },
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
