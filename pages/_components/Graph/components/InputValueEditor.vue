<template>
  <div class="input-value-editor">
    <div v-if="warning" class="form-control-label">
      <span class="text-warning">
        <i class="el-icon-error" />
        {{ warning }}
      </span>
    </div>
    <div class="input-group m-b-1">
      <!--Each leaf field will be wrapped as an input group-->
      <!--Nested fields below should not be wrapped into other container elements-->
      <!--because it will break size and positioning-->
      <div v-if="isSingleInputTypes()" class="el-row el-row--flex is-align-middle">
        <!--Enums-->
        <template v-if="isInputType('enum')">
          <select v-model="actualValue" class="form-control" :disabled="readonly">
            <option v-for="val of inputEnumSymbols" :key="val" :value="val">
              {{ val }}
            </option>
          </select>
        </template>

        <!--Numbers-->
        <template v-else-if="isInputType('int')">
          <input v-model.number="actualValue" type="number" class="form-control" :disabled="readonly" />
        </template>
        <template v-else-if="isInputType('float')">
          <input v-model.number="actualValue" type="number" class="form-control" :disabled="readonly" />
        </template>

        <!--Strings-->
        <template v-else-if="isInputType('string')">
          <input v-model="actualValue" class="form-control" :disabled="readonly" />
        </template>

        <!--Booleans-->
        <template v-else-if="isInputType('boolean')">
          <label class="clickable" style="margin: 0 auto 0 0">
            <span>{{ actualValue ? 'Yes' : 'No' }}</span>
            <el-switch v-model="actualValue" :disabled="readonly" />
          </label>
        </template>

        <!--Maps-->
        <template v-else-if="isInputType('map')">
          <map-list ref="mapList" v-model="actualValue" :readonly="readonly" class="w-100" />
        </template>

        <!--Files and array of Files-->
        <template v-else-if="isInputType('File')">
          <div class="el-row w-100">
            <native-file-browser-form-field :form-control="control.get('path')" @onUpdate="onControlUpdate($event, control.get('path'))" />
            <el-button v-if="control.get('path').enabled" size="mini" type="text" @click="promptFileMetadata()">
              <div v-if="metadataKeysCount > 0 || secondaryFilesCount > 0">
                {{ secondaryFilesCount }} {{ $t('graph.SecondaryFiles') }}, {{ metadataKeysCount }} {{ $t('common.metadata') }}
              </div>
              <span v-else>{{ $t('graph.add_files_and_metadata') }}</span>
            </el-button>
            <input-value-editor-modal ref="fileMetadata" @on-update="onUpdateFileMetadata" />
          </div>
        </template>

        <!--Directories and array of Directories-->
        <template v-else-if="isInputType('Directory')">
          <div class="el-row w-100">
            <native-file-browser-form-field :form-control="control.get('path')" @onUpdate="onControlUpdate($event, control.get('path'))" />
          </div>
        </template>
      </div>

      <!--Records-->
      <template v-else-if="isInputType('record')">
        <div v-if="inputRecordFields.length === 0" class="text-muted">此记录没有字段。</div>
        <div v-for="(entry, index) of inputRecordFields" :key="index" class="m-l-1">
          <label>
            {{ entry && (entry.label || entry.id) }}
            <span class="text-muted">({{ entry.type.type }})</span>
            <el-tooltip v-if="entry.description">
              <i class="el-icon-info text-muted" />
              <div slot="content">
                {{ entry.description }}
              </div>
            </el-tooltip>
          </label>
          <input-value-editor
            :form-control="control.get(entry.id)"
            :readonly="readonly"
            :input-type="entry.type.type"
            :input-array-items-type="entry.type.items"
            :input-enum-symbols="entry.type.symbols"
            :input-record-fields="entry.type.fields"
            @on-update="onControlUpdate($event, control.get(entry.id))"
          />
        </div>
      </template>

      <!--Arrays-->
      <template v-else-if="isInputType('array')">
        <div v-for="(ctrl, idx) of control.controls" :key="idx" class="el-row el-row--flex is-column m-b-05">
          <!--Delete button if array of maps-->
          <div v-if="inputArrayItemsType === 'map'" class="pb-1">
            <span class="text-muted"> [{{ idx }}] </span>
            <el-tooltip v-if="!readonly" content="Delete map array">
              <i class="el-icon-delete-solid pointer remove-icon pull-right" @click="deleteFromArray(idx)" />
            </el-tooltip>
          </div>

          <div class="el-row el-row--flex is-align-middle">
            <input-value-editor
              :input-type="inputArrayItemsType"
              :input-enum-symbols="inputEnumSymbols"
              :input-record-fields="inputRecordFields"
              :readonly="readonly"
              :form-control="ctrl"
              class="el-col-full mb-0"
              @on-update="onControlUpdate($event, ctrl)"
            />

            <!--Delete button if not array of maps-->
            <el-tooltip v-if="inputArrayItemsType !== 'map' && !readonly" content="删除">
              <i class="el-icon-delete-solid clickable remove-icon" @click="deleteFromArray(idx)" />
            </el-tooltip>
          </div>
        </div>
        <div v-if="control.enabled">
          <!--Add array item button in case that element is not File or Directory-->
          <div v-if="inputArrayItemsType !== 'File' && inputArrayItemsType !== 'Directory'">
            <el-button v-if="!readonly" type="text" size="mini" class="text-capitalize" icon="el-icon-plus" @click="addArrayEntry()">
              新增 {{ inputArrayItemsType }}
            </el-button>
          </div>

          <!--Add array item button in case that element is File or Directory-->
          <div v-else>
            <el-button v-if="!readonly" type="text" size="mini" class="text-capitalize" icon="el-icon-plus" @click="addArrayFileOrDirectory()">
              新增 {{ inputArrayItemsType }}
            </el-button>
          </div>
        </div>
      </template>

      <!--Unknown-->
      <template v-else> {{ $t('graph.unknown_input_type') }}: {{ inputType || 'null' }} </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import InputValueEditorModal from '@/pages/_components/Graph/components/InputValueEditorModal.vue'
import NativeFileBrowserFormField from '@/pages/_components/Graph/components/NativeFileBrowserFormField.vue'
import { FormArray, FormControl, FormGroup } from '@/components/FormControl'
import MapList from '@/pages/_components/Graph/components/MapList.vue'
import { InputParameterModel } from 'cwlts/models/generic/InputParameterModel'

@Component({
  components: { MapList, InputValueEditorModal, NativeFileBrowserFormField, InputValueEditor: () => import('./InputValueEditor.vue') },
})
export default class InputValueEditor extends Vue {
  $refs!: {
    input: HTMLFormElement
    fileMetadata: InputValueEditorModal
    mapList: MapList
  }

  @Prop({ default: false })
  readonly!: boolean
  @Prop({ required: true })
  inputType!: string
  @Prop({ default: '' })
  inputArrayItemsType!: string
  @Prop({
    default() {
      return []
    },
  })
  inputEnumSymbols!: string[]
  @Prop({
    default() {
      return []
    },
  })
  inputRecordFields!: InputParameterModel[]
  @Prop({ default: '' })
  relativePathRoot!: string
  @Prop({
    required: true,
    default() {
      return new FormControl(null)
    },
  })
  formControl!: any

  warning: any = null
  metadataKeysCount = 0
  secondaryFilesCount = 0
  control: any = null

  get changeInput(): any {
    return [this.inputType, this.inputRecordFields]
  }
  get actualValue() {
    return this.control?.value
  }
  set actualValue(value) {
    // 只对普通类型有效
    console.log('set actualValue', value)
    this.$emit('on-update', value)
  }

  @Watch('changeInput', { immediate: true })
  onWatchChangeInput(): void {
    this.setupFormControls()
  }
  @Watch('readonly')
  onWatchReadonly(): void {
    if (this.readonly) {
      this.control.disable({ onlySelf: true, emitEvent: false })
    } else {
      this.control.enable({ onlySelf: true, emitEvent: false })
    }
  }
  @Watch('formControl.value', { immediate: true })
  onWatchFormControl(): void {
    const value = this.formControl.value
    if (value === undefined) {
      return
    }
    const updateOptions = { emitEvent: false }
    this.warning = undefined
    let update = value
    switch (this.inputType) {
      case 'record':
        update = value instanceof Object ? value : {}
        // eslint-disable-next-line no-case-declarations
        const group = this.control
        if (!value) {
          for (const key in group.controls) {
            group.controls[key].setValue(null, updateOptions)
          }
          this.control.patchValue(update, updateOptions)
          break
        }
        this.control.patchValue(update, updateOptions)
        break
      case 'array':
        if (this.inputType === 'array' && !Array.isArray(value)) {
          this.patchArrayValue([], updateOptions)
        } else {
          this.patchArrayValue(update, updateOptions)
        }
        break
      case 'string':
        this.control.setValue(update ? String(update) : '', updateOptions)
        break
      case 'float':
        // eslint-disable-next-line no-case-declarations
        const _float = typeof update !== 'number' ? parseFloat(update) : update
        this.control.setValue(isNaN(_float) ? 0 : _float, updateOptions)
        break
      case 'int':
        // eslint-disable-next-line no-case-declarations
        const int = parseInt(update)
        this.control.setValue(isNaN(int) ? 0 : int, updateOptions)
        break
      case 'boolean':
        this.control.setValue(Boolean(update), updateOptions)
        break
      case 'Directory':
        update = value || {}
        this.control.setValue(
          {
            class: this.inputType,
            path: update.path || '',
          },
          updateOptions
        )
        this.recalculateSecondaryFilesAndMetadataCounts()
        break
      case 'File':
        update = value || {}
        this.control.setValue(
          {
            class: this.inputType,
            path: update.path || '',
            secondaryFiles: Array.isArray(update.secondaryFiles) ? update.secondaryFiles : [],
            // eslint-disable-next-line no-prototype-builtins
            metadata: Object.prototype.isPrototypeOf(update.metadata) ? update.metadata : {},
          },
          updateOptions
        )
        this.recalculateSecondaryFilesAndMetadataCounts()
        break
      default:
        this.control.setValue(update, updateOptions)
        break
    }
  }

  // 为了使用 default，switch 功能组件需要升级到 vue3
  isSingleInputTypes(): boolean {
    return ['enum', 'int', 'float', 'string', 'boolean', 'map', 'File', 'Directory'].includes(this.inputType)
  }
  isInputType(type: any): boolean {
    return this.inputType === type
  }
  clear(): void {
    this.control?.setValue(null)
  }
  focus(): void {
    if (this.$refs.input) {
      this.$refs.input.focus()
    }
  }
  addArrayEntry(): void {
    this.warning = undefined
    const control = this.makeControlForArray()
    this.control?.push(control)
    this.$emit('on-update', this.control.value)
  }
  addArrayFileOrDirectory(): void {
    const properties = ['multiSelections']
    properties.push(this.inputArrayItemsType === 'File' ? 'openFile' : 'openDirectory')
    this.control.push(new FormControl({ class: this.inputArrayItemsType, path: '' }))
    this.$emit('on-update', this.control.value)
  }
  deleteFromArray(index: number, control = this.control): void {
    control.removeAt(index)
    this.$emit('on-update', this.control.value)
  }
  setupFormControls(): void {
    const disabled = this.readonly
    let control: any
    switch (this.inputType) {
      case 'array':
        control = new FormArray([])
        disabled ? control.disable() : control.enable()
        break
      case 'record':
        // eslint-disable-next-line no-case-declarations
        const controls: any = {}
        for (const field of this.inputRecordFields) {
          controls[field.id] = new FormControl({ value: undefined, disabled })
        }
        control = new FormGroup(controls)
        break
      case 'File':
        control = new FormGroup({
          path: new FormControl({ value: undefined, disabled }),
          class: new FormControl({ value: 'File', disabled }),
          metadata: new FormControl({ value: {}, disabled }),
          secondaryFiles: new FormControl({ value: [], disabled }),
        })
        break
      case 'Directory':
        control = new FormGroup({
          class: new FormControl('Directory'),
          path: new FormControl({ value: undefined, disabled }),
        })
        break
      default:
        control = new FormControl()
        disabled ? control.disable() : control.enable()
        break
    }
    this.$set(this, 'control', control)
  }
  patchArrayValue(update: any, options: any): void {
    const updateIsSameSize = update.length === this.control.length
    const serializesEqually = () => JSON.stringify(update) === JSON.stringify(this.control.value)
    const shouldNotEmit = options.emitEvent === false
    // This solves a problem that
    if (updateIsSameSize && shouldNotEmit && serializesEqually()) {
      return
    }
    if (!updateIsSameSize) {
      const ctrlArr = Array.apply(null, Array(update.length)).map(() => this.makeControlForArray())
      this.control = new FormArray(ctrlArr)
      this.readonly ? this.control.disable(options) : this.control.enable(options)
    }
    this.control.setValue(update, options)
    this.$emit('on-update', update)
  }
  promptFileMetadata(): void {
    this.$refs.fileMetadata.showDialog(this.control.value, this.relativePathRoot)
  }
  onUpdateFileMetadata(value: any): void {
    this.control.patchValue(value)
    this.$emit('on-update', this.control.value)
  }
  makeControlForArray(): any {
    switch (this.inputArrayItemsType) {
      case 'array':
        return new FormArray([])
      case 'record':
        return new FormControl({})
      case 'string':
        return new FormControl('')
      case 'int':
      case 'float':
        return new FormControl(0)
      case 'boolean':
        return new FormControl(false)
      case 'Directory':
        return new FormControl({
          class: 'Directory',
          path: '',
        })
      case 'File':
        return new FormControl({
          path: '',
          class: 'File',
          metadata: {},
          secondaryFiles: [],
        })
      default:
        return new FormControl()
    }
  }
  recalculateSecondaryFilesAndMetadataCounts(): void {
    // eslint-disable-next-line no-prototype-builtins
    const ctrlVal = Object.prototype.isPrototypeOf(this.control.value) ? this.control.value : {}
    const { secondaryFiles, metadata } = ctrlVal
    this.secondaryFilesCount = Array.isArray(secondaryFiles) ? secondaryFiles.length : 0
    // eslint-disable-next-line no-prototype-builtins
    this.metadataKeysCount = Object.prototype.isPrototypeOf(metadata) ? Object.keys(metadata).length : 0
  }
  onControlUpdate(value: any, control: any): void {
    // 非普通类型的更新方式
    console.log('onControlUpdate', value)
    control.setValue(value)
    this.$emit('on-update', this.control.value)
  }
  mounted(): void {
    this.$nextTick(() => {
      this.$refs.mapList?.setMetaDate(this.actualValue)
    })
  }
}
</script>

<style>
.remove-icon {
  display: flex;
  height: calc(2.5rem - 2px);
  line-height: calc(2.5rem - 2px);
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  color: #eee;
}
</style>
