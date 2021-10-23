<template>
  <div>
    <div class="codemirror-box">
      <client-only placeholder="Loading...">
        <codemirror v-model="content" :options="cmOptions" />
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    codemirror: () => {
      if (process.client) {
        return import('@/pages/application/_components/CodeMirror.vue')
      }
    },
  },
})
export default class structure extends Vue {
  content = ''
  cmOptions = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/yaml',
    lineWrapping: true,
    theme: 'default',
    readOnly: true,
  }
  get item() {
    return this.$store.state.datum
  }
  mounted() {
    this.content = this.item.content?.toString()
  }
}
</script>
