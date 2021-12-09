<template>
  <div class="container-fluid">
    <div class="px-15 mb-10 text-muted">类别为数据（包）时由系统自动生成</div>
    <div class="codemirror-box">
      <code-mirror-client v-model="content" :options="{ readOnly: true }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import DatumStructure from '@/pages/application/datum/_id/index/structure.vue'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'
@Component({
  components: { CodeMirrorClient },
})
export default class DatumEditStructure extends DatumStructure {}
</script>
