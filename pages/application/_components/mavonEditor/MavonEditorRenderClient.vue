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
      :navigation="true"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </client-only>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'

@Component
export default class MavonEditorRenderClient extends MavonEditorClient {}
</script>

<style lang="scss">
.read-only.v-note-wrapper {
  z-index: 1;
  border: none;
  .v-show-content {
    padding: 0 !important;
  }
}
</style>
