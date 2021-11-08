<template>
  <div>
    <slot>UploaderDrop</slot>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FileUploaderMixin from './FileUploaderMixin.vue'

@Component
export default class FileUploaderDrop extends FileUploaderMixin {}
</script>
