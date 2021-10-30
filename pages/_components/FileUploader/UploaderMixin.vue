<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'

@Component
export default class UploaderMixin extends Vue {
  @Inject('FileUploader')
  uploader!: any
}
</script>
