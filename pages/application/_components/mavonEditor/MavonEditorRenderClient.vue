<template>
  <div class="markdown-body" v-html="rawHtml"></div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ClientMixin from '@/pages/application/_components/ClientMixin.vue'
import '../markdown/github-markdown.min.css'
import mavonEditor from 'mavon-editor'

@Component
export default class MavonEditorRenderClient extends ClientMixin {
  get rawHtml(): string {
    console.log(process.client ? mavonEditor.markdownIt.render(this.value) : '')
    return process.client ? mavonEditor.markdownIt.render(this.value) : ''
  }
}
</script>
