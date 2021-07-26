<template>
  <div v-once class="text-center mt-20">
    ©2021 六点了技术
    <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021047962号-1</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Copyright extends Vue {}
</script>
