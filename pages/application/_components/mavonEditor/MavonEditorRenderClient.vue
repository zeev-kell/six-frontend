<template>
  <client-only placeholder="Loading...">
    <mavon-editor
      ref="md"
      v-model="content"
      class="read-only"
      preview-background="#ffffff"
      default-open="preview"
      :subfield="false"
      :toolbars-flag="false"
      :editable="false"
      :box-shadow="false"
      :transition="true"
      :code-style="codeStyle"
      :external-link="externalLink"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </client-only>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'

@Component
export default class MavonEditorRenderClient extends MavonEditorClient {
  getNavigation(): any[] {
    const $div = document.createElement('div')
    $div.innerHTML = this.$refs.md.d_render
    const nodes = $div.children
    const list: any[] = []
    Array.from(nodes).forEach((node) => {
      if (/^H[1-6]$/.exec(node.tagName)) {
        const id = node.querySelector('a')?.id
        if (id) {
          list.push({
            tag: node.tagName,
            id,
            text: node.textContent,
            level: node.tagName.substring(1),
            index: list.length,
            children: [],
          })
        }
      }
    })
    return list
  }
}
</script>

<style lang="scss">
.read-only.v-note-wrapper {
  z-index: 1;
  border: none;
  min-height: 100px;
  .v-show-content {
    padding: 0 !important;
  }
}
</style>
