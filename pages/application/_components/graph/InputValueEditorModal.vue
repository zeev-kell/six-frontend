<template>
  <el-dialog title="Secondary files and metadata" :visible.sync="dialogFormVisible" class="el-dialog-dark">
    <el-form @submit.native.prevent>
      <div class="form-group">
        <label>Secondary files</label>
        <div v-for="(group, idx) of controls" :key="idx" class="m-b-1 el-input el-input-group el-input-group--append">
          <native-file-browser-form-field
            class="el-input__inner"
            :form-control="group.get('path')"
            :selection-type="group.get('class').value === 'File' ? 'file' : 'directory'"
          />
          <span class="el-input-group__append" style="background: transparent; border: none">
            <button :disabled="readonly" type="button" class="pointer el-button--text" @click="deleteSecondaryFile(idx)">
              <i class="el-icon-delete"></i>
            </button>
          </span>
        </div>
        <div>
          <el-button type="text" size="mini" @click="addSecondaryFile('', 'File')"> <i class="el-icon-plus"></i> Add a file </el-button>
          <template v-if="allowDirectories">
            or
            <el-button type="text" class="ml-0" size="mini" @click="addSecondaryFile('', 'Directory')"> a directory </el-button>
          </template>
        </div>
      </div>
      <div class="form-group m-b-1">
        <label>Metadata</label>
        <!-- TODO -->
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="dark" size="mini" @click="onClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/babel">
import NativeFileBrowserFormField from '@/pages/application/_components/graph/NativeFileBrowserFormField'
import { FormArray, FormControl, FormGroup } from '@/pages/application/_components/FormControl'
export default {
  name: 'InputValueEditorModal',
  components: { NativeFileBrowserFormField },
  inject: ['dataModel'],
  data() {
    return {
      dialogFormVisible: false,
      metadata: undefined,
      secondaryFiles: undefined,
      relativePathRoot: '',
      readonly: false,
      form: new FormGroup({}),
    }
  },
  computed: {
    allowDirectories() {
      return !this.dataModel?.cwlVersion.includes('draft-2')
    },
    controls() {
      return this.form.get('secondaryFiles')?.controls
    },
  },
  methods: {
    showDialog({ secondaryFiles, metadata }, relativePathRoot) {
      this.secondaryFiles = secondaryFiles
      this.metadata = metadata
      this.relativePathRoot = relativePathRoot
      this.form = new FormGroup({
        secondaryFiles: new FormArray([]),
        metadata: new FormControl(this.metadata),
      })
      this.dialogFormVisible = true
    },
    deleteSecondaryFile(index) {
      const ctrl = this.form.get('secondaryFiles')
      ctrl.removeAt(index)
    },
    addSecondaryFile(path = '', type) {
      const ctrl = this.form.get('secondaryFiles')
      ctrl.push(
        new FormGroup({
          class: new FormControl(type),
          path: new FormControl(path),
        })
      )
    },
    onClose() {
      this.dialogFormVisible = false
    },
    onSubmit() {
      this.dialogFormVisible = false
    },
  },
}
</script>
