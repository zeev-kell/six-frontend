<template>
  <div>
    <slot>UploaderDrop</slot>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import UploaderMixin from './FileUploaderMixin.vue'

@Component
export default class UploaderDrop extends UploaderMixin {}
</script>
