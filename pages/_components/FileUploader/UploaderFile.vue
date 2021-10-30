<template>
  <div class="uploader-file">uploader-file</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class UploaderFile extends Vue {
  @Prop({
    required: true,
  })
  file!: File
}
</script>
