<template>
  <el-dialog :title="$t('graph.files_and_metadata')" :visible.sync="dialogFormVisible" class="el-dialog-dark">
    <el-form @submit.native.prevent>
      <div class="form-group">
        <label>{{ $t('graph.SecondaryFiles') }}</label>
        <div v-for="(group, idx) of controls" :key="idx" class="m-b-1 el-input el-input-group el-input-group--append">
          <native-file-browser-form-field
            class="el-input__inner"
            :form-control="group.get('path')"
            :selection-type="group.get('class').value === 'File' ? 'file' : 'directory'"
          />
          <span class="el-input-group__append" style="background: transparent; border: none">
            <button :disabled="readonly" type="button" class="pointer el-button--text" @click="deleteSecondaryFile(idx)">
              <i class="el-icon-delete" />
            </button>
          </span>
        </div>
        <div>
          <el-button type="text" size="mini" @click="addSecondaryFile('', 'File')"> <i class="el-icon-plus" /> {{ $t('graph.add_file') }} </el-button>
          <template v-if="allowDirectories">
            {{ $t('common.or') }}
            <el-button type="text" class="ml-0" size="mini" @click="addSecondaryFile('', 'Directory')">
              {{ $t('graph.directory') }}
            </el-button>
          </template>
        </div>
      </div>
      <div class="form-group m-b-1">
        <label> {{ $t('common.metadata') }}</label>
        <!-- TODO -->
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="dark" size="mini" @click="onClose"> 取 消 </el-button>
      <el-button type="primary" size="mini" @click="onSubmit"> 确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'nuxt-property-decorator'
import NativeFileBrowserFormField from '@/pages/_components/Graph/components/NativeFileBrowserFormField.vue'
import { WorkflowModel } from 'cwlts/models'
import { FormArray, FormControl, FormGroup } from '@/components/FormControl'

@Component({
  components: { NativeFileBrowserFormField },
})
export default class InputValueEditorModal extends Vue {
  @InjectReactive('model')
  model!: WorkflowModel

  dialogFormVisible = false
  metadata: any = null
  secondaryFiles: any = null
  relativePathRoot = ''
  readonly = false
  form = new FormGroup({})

  get allowDirectories(): boolean {
    return !this.model?.cwlVersion.includes('draft-2')
  }
  get controls(): any {
    return this.form.get('secondaryFiles')?.controls
  }

  showDialog({ secondaryFiles, metadata }: any, relativePathRoot: any): void {
    this.secondaryFiles = secondaryFiles
    this.metadata = metadata
    this.relativePathRoot = relativePathRoot
    this.form = new FormGroup({
      secondaryFiles: new FormArray([]),
      metadata: new FormControl(this.metadata),
    })
    this.dialogFormVisible = true
  }
  deleteSecondaryFile(index: number): void {
    const ctrl: any = this.form.get('secondaryFiles')
    ctrl.removeAt(index)
  }
  addSecondaryFile(path = '', type: any): void {
    const ctrl: any = this.form.get('secondaryFiles')
    ctrl.push(
      new FormGroup({
        class: new FormControl(type),
        path: new FormControl(path),
      })
    )
  }
  onClose(): void {
    this.dialogFormVisible = false
  }
  onSubmit(): void {
    this.dialogFormVisible = false
  }
}
</script>
