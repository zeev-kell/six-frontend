<template>
  <div class="uploader-list">
    {{ fileList }}
    <slot :file-list="fileList">
      <ul>
        <li v-for="file in fileList" :key="file.id">
          <uploader-file :file="file" :list="true"></uploader-file>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import UploaderMixin from './UploaderMixin.vue'
import UploaderFile from './UploaderFile.vue'

@Component({
  components: { UploaderFile },
})
export default class UploaderList extends UploaderMixin {
  get fileList(): any[] {
    return this.uploader?.fileList
  }
}
</script>
