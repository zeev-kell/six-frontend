<template>
  <div class="codemirror-box">
    <code-mirror-client v-model="content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CodeMirrorClient from '@/pages/application/_components/CodeMirrorClient.vue'
import { DatumModel } from '@/types/model/Datum'

@Component({
  components: {
    CodeMirrorClient,
  },
})
export default class DatumEditStructure extends Vue {
  content = ''
  get item(): DatumModel {
    return this.$store.state.datum
  }
  mounted(): void {
    this.content = this.item.content?.toString()
  }
}
</script>
