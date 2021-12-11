<template>
  <div class="card container-fluid">
    <div class="codemirror-box">
      <code-mirror-client v-model="content" :options="{ readOnly: true }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'

@Component({
  components: {
    CodeMirrorClient,
  },
})
export default class DatumStructure extends DatumItemMixin {
  content = ''
  mounted() {
    this.content = this.item.content?.toString()
  }
}
</script>
