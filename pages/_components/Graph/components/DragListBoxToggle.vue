<template>
  <svg v-once xmlns="http://www.w3.org/2000/svg" class="svg-icon icon" viewBox="0 0 16 86" aria-hidden="true" width="16" height="86">
    <g fill="none" fill-rule="evenodd">
      <path class="path-wapper" d="M0 0l14.12 8.825A4 4 0 0116 12.217v61.566a4 4 0 01-1.88 3.392L0 86V0z" fill="#3c3c3c"></path>
      <path
        class="path-arrow"
        d="M10.758 48.766a.778.778 0 000-1.127L6.996 43l3.762-4.639a.778.778 0 000-1.127.85.85 0 00-1.172 0l-4.344 5.202a.78.78 0 000 1.128l4.344 5.202a.85.85 0 001.172 0z"
        fill="rgb(184, 188, 191)"
        fill-rule="nonzero"
      ></path>
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DragListBoxToggle extends Vue {}
</script>
