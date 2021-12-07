<template>
  <client-only placeholder="Loading...">
    <mavon-editor v-model="content" :external-link="externalLink" v-bind="$attrs" v-on="$listeners" />
  </client-only>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ClientMixin from '@/pages/application/_components/ClientMixin.vue'

@Component
export default class MavonEditorClient extends ClientMixin {
  externalLink = {
    markdown_css() {
      // 这是你的markdown css文件路径
      return '/markdown/github-markdown.min.css'
    },
    hljs_js() {
      // 这是你的hljs文件路径
      return '/highlight/highlight.min.js'
    },
    hljs_css(css) {
      // 这是你的代码高亮配色文件路径
      return '/highlight/styles/' + css + '.css'
    },
    hljs_lang(lang) {
      // 这是你的代码高亮语言解析路径
      return '/highlight/lib//languages/' + lang + '.min.js'
    },
    katex_css() {
      // 这是你的katex配色方案路径路径
      return '/katex/katex.min.css'
    },
    katex_js() {
      // 这是你的katex.js路径
      return '/katex/katex.min.js'
    },
  }
}
</script>
