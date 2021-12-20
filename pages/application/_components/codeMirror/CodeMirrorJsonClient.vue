<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'

@Component
export default class CodeMirrorJsonClient extends CodeMirrorClient {
  defaultOptions = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/json',
    lineWrapping: true,
    theme: 'default',
  }
}
</script>
