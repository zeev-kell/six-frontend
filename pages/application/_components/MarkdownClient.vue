<template>
  <client-only placeholder="Loading...">
    <markdown v-model="content" />
  </client-only>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ClientMixin from '@/pages/application/_components/ClientMixin.vue'

@Component({
  components: {
    Markdown: () => {
      if (process.client) {
        return import('@/pages/application/_components/markdown/simple')
      }
    },
  },
})
export default class MarkdownClient extends ClientMixin {}
</script>
