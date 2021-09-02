<template>
  <a :href="href" target="_blank">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DocsLink extends Vue {
  @Prop({ required: true })
  to!: string
  DOCS_URL = process.env.DOCS_URL

  get href(): string {
    return this.DOCS_URL + this.to
  }
}
</script>
