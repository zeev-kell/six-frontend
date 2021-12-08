<template>
  <client-only placeholder="Loading...">
    <mavon-editor
      ref="md"
      v-model="content"
      :subfield="subfield"
      :code-style="codeStyle"
      :external-link="externalLink"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </client-only>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ClientMixin from '@/pages/application/_components/ClientMixin.vue'

@Component
export default class MavonEditorClient extends ClientMixin {
  $refs!: {
    md: HTMLFormElement
  }

  subfield = false
  codeStyle = 'github'
  externalLink = {
    markdown_css() {
      // 这是你的markdown css文件路径
      return '/markdown/github-markdown.min.css'
    },
    hljs_js() {
      // 这是你的hljs文件路径
      return '/highlight/highlight.min.js'
    },
    hljs_css(css: string) {
      // 这是你的代码高亮配色文件路径
      return '/highlight/styles/' + css + '.css'
    },
    hljs_lang(lang: string) {
      // 这是你的代码高亮语言解析路径
      return '/highlight/lib/languages/' + lang + '.js'
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

<style lang="scss">
.markdown-body {
  .hljs {
    background: transparent;
  }
  pre code {
    font-size: 1em;
  }
  a:not([href]) {
    position: relative;
    top: -70px;
  }
}
</style>
