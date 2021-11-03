<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FileUploaderImplement from '@/pages/_components/FileUploader/FileUploaderImplement'

@Component({
  inject: ['FileUploader'],
})
export default class FileUploaderMixin extends Vue {
  FileUploader!: FileUploaderImplement
}
</script>
