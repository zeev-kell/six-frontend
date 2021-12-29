<template>
  <nuxt-link v-slot="{ href }" :to="to" custom>
    <slot :navigate="toNavigate(href)"></slot>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'

@Component
export default class NuxtBack extends Vue {
  @Prop({ required: true })
  to!: any
  toNavigate(navigate: any): any {
    return () => {
      if (window.history.length < 0) {
        this.$router.go(-1)
      } else {
        navigate()
      }
    }
  }
}
</script>
