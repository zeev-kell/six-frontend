<template>
  <div class="border p-20">
    <slot>UploaderDrop</slot>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FileUploaderInject from '../FileUploaderInject.vue'

@Component
export default class FileUploaderDrop extends FileUploaderInject {}
</script>
