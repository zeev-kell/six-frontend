<template>
  <el-dialog :title="$t('graph.files_and_metadata')" :visible.sync="dialogFormVisible" class="el-dialog-dark">
    <el-form @submit.native.prevent>
      <div class="form-group">
        <label>{{ $t('graph.SecondaryFiles') }}</label>
        <div v-for="(group, idx) of controls" :key="idx" class="mt-10-a el-row el-row--flex is-align-middle">
          <native-file-browser-form-field
            class="el-input__inner"
            :form-control="group.get('path')"
            :selection-type="group.get('class').value === 'File' ? 'file' : 'directory'"
            @onUpdate="onUpdate($event, group.get('path'))"
          />
          <el-button :disabled="readonly" type="dark" class="el-button--icon ml-5 el-auto" icon="el-icon-delete" @click="deleteSecondaryFile(idx)">
          </el-button>
        </div>
        <div class="mt-5">
          <el-button type="text" size="mini" @click="addSecondaryFile('', 'File')"> <i class="el-icon-plus" /> {{ $t('graph.add_file') }} </el-button>
          <template v-if="allowDirectories">
            {{ $t('common.or') }}
            <el-button type="text" class="ml-0" size="mini" @click="addSecondaryFile('', 'Directory')">
              {{ $t('graph.directory') }}
            </el-button>
          </template>
        </div>
      </div>
      <map-list ref="MapList" class="form-group m-b-1"></map-list>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="dark" size="mini" @click="onClose"> 取 消 </el-button>
      <el-button type="primary" native-type="submit" size="mini" @click="onSubmit"> 确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue } from 'nuxt-property-decorator'
import NativeFileBrowserFormField from '@/pages/_components/Graph/components/NativeFileBrowserFormField.vue'
import { WorkflowModel } from 'cwlts/models'
import { FormArray, FormControl, FormGroup } from '@/components/FormControl.js'
import MapList from '@/pages/_components/Graph/components/MapList.vue'

@Component({
  components: { MapList, NativeFileBrowserFormField },
})
export default class InputValueEditorModal extends Vue {
  $refs!: {
    MapList: MapList
  }
  @InjectReactive('model')
  model!: WorkflowModel
  @Prop({ default: false })
  readonly!: boolean

  dialogFormVisible = false
  metadata: any = null
  secondaryFiles: any = null
  relativePathRoot = ''
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
    try {
      for (const entry of this.secondaryFiles) {
        const formArray = this.form.get('secondaryFiles') as FormArray
        formArray.push(
          new FormGroup({
            class: new FormControl(entry.class),
            path: new FormControl(entry.path),
          })
        )
      }
    } catch (ex) {
      console.warn('Invalid secondary files format', this.secondaryFiles)
    }
    this.dialogFormVisible = true
    this.$nextTick(() => {
      this.$refs.MapList.setMetaDate(this.metadata)
    })
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
  onUpdate(value: any, control: any): void {
    // 非普通类型的更新方式
    control.setValue(value)
  }
  onClose(): void {
    this.dialogFormVisible = false
  }
  onSubmit(): void {
    const fVal = this.form.value
    fVal.metadata = this.$refs.MapList.getMetadata()
    fVal.secondaryFiles = fVal.secondaryFiles.filter((entry: any) => entry.path.trim() !== '')
    this.$emit('on-update', fVal)
    this.dialogFormVisible = false
  }
}
</script>
