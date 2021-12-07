<template>
  <client-only placeholder="Loading...">
    <codemirror v-model="content" :options="cmOptions" @input="$emit('input', $event)" />
  </client-only>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import ClientMixin from '@/pages/application/_components/ClientMixin.vue'

@Component({
  components: {
    codemirror: () => {
      if (process.client) {
        return import('@/pages/application/_components/codeMirror/CodeMirror.vue')
      }
    },
  },
})
export default class CodeMirrorClient extends ClientMixin {
  @Prop({
    default() {
      return {}
    },
  })
  options!: any
  defaultOptions = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/yaml',
    lineWrapping: true,
    theme: 'default',
  }
  get cmOptions(): any {
    return Object.assign({}, this.options, this.defaultOptions)
  }
}
</script>
