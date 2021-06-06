<template>
  <div class="input-value-editor">
    <div v-if="warning" class="form-control-label">
      <span class="text-warning">
        <i class="el-icon-error"></i>
        {{ warning }}
      </span>
    </div>
    <div class="el-form-item mb-1r">
      <!--Each leaf field will be wrapped as an input group-->
      <!--Nested fields below should not be wrapped into other container elements-->
      <!--because it will break size and positioning-->
      <div v-if="isSingleInputTypes()" class="el-row el-row--flex is-align-middle">
        <!--Enums-->
        <template v-if="isInputType('enum')">
          <select v-model="actualValue" class="form-control">
            <option v-for="val of inputEnumSymbols" :key="val" :value="val">
              {{ val }}
            </option>
          </select>
        </template>

        <!--Numbers-->
        <template v-else-if="isInputType('int')">
          <input v-model="actualValue" type="number" class="form-control" :disabled="readonly" />
        </template>
        <template v-else-if="isInputType('float')">
          <input v-model="actualValue" type="number" class="form-control" :disabled="readonly" />
        </template>

        <!--Strings-->
        <template v-else-if="isInputType('string')">
          <input v-model="actualValue" class="form-control" :disabled="readonly" />
        </template>

        <!--Booleans-->
        <template v-else-if="isInputType('boolean')">
          <label class="clickable">
            <span>{{ actualValue ? 'Yes' : 'No' }}</span>
            <el-switch v-model="actualValue" :disabled="readonly" />
          </label>
        </template>

        <!--Maps-->
        <template v-else-if="isInputType('map')">
          <div><!-- TODO --></div>
        </template>

        <!--Files and array of Files-->
        <template v-else-if="isInputType('File')">
          <div class="el-row" style="width: 100%">
            <native-file-browser-form-field
              :form-control="control.get('path')"
              @onUpdate="onChildUpdate($event, control.get('path'))"
            />
            <el-button v-if="control.get('path').enabled" size="mini" type="text" @click="promptFileMetadata()">
              <div v-if="metadataKeysCount > 0 || secondaryFilesCount > 0">
                {{ secondaryFilesCount }} secondary {{ secondaryFilesCount === 1 ? 'file' : 'files' }},
                {{ metadataKeysCount }} metadata
              </div>
              <span v-else>Add secondary files and metadata</span>
            </el-button>
          </div>
        </template>

        <!--Directories and array of Directories-->
        <template v-else-if="isInputType('Directory')">
          <div><!-- TODO --></div>
        </template>
      </div>

      <!--Records-->
      <template v-else-if="isInputType('record')">
        <div v-if="inputRecordFields.length === 0">This record has no fields.</div>
        <div v-for="(entry, index) of inputRecordFields" :key="index" class="ml-1r">
          <label>
            {{ entry ? entry.label : entry.id }}
            <span class="text-muted">({{ entry.type.type }})</span>
            <el-tooltip v-if="entry.description">
              <i class="el-icon-info text-muted"></i>
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
          />
        </div>
      </template>

      <!--Arrays-->
      <template v-else-if="isInputType('array')">
        <div v-for="(ctrl, idx) of control.controls" :key="idx" class="array-row">
          <!--Delete button if array of maps-->
          <div v-if="inputArrayItemsType === 'map'" class="pb-1">
            <span class="text-muted"> [{{ idx }}] </span>
            <el-tooltip v-if="!readonly" content="Delete map array">
              <i class="fa fa-trash clickable remove-icon pull-right" @click="deleteFromArray(idx)"></i>
            </el-tooltip>
          </div>

          <div class="array-entry">
            <input-value-editor
              ref="arrayItem"
              :input-type="inputArrayItemsType"
              :input-enum-symbols="inputEnumSymbols"
              :input-record-fields="inputRecordFields"
              :readonly="readonly"
              :form-control="ctrl"
              @onChildUpdate="onChildUpdate"
            />

            <!--Delete button if not array of maps-->
            <el-tooltip v-if="inputArrayItemsType !== 'map' && !readonly" content="Delete">
              <i class="fa fa-trash clickable remove-icon pull-right" @click="deleteFromArray(idx)"></i>
            </el-tooltip>
          </div>
        </div>
        <div v-if="control.enabled">
          <!--Add array item button in case that element is not File or Directory-->
          <div v-if="inputArrayItemsType !== 'File' && inputArrayItemsType !== 'Directory'">
            <button v-if="!readonly" type="button" class="btn pl-0 btn-link" @click="addArrayEntry()">
              <i class="fa fa-plus"></i> New {{ inputArrayItemsType }}
            </button>
          </div>

          <!--Add array item button in case that element is File or Directory-->
          <div v-else>
            <button v-if="!readonly" type="button" class="btn pl-0 btn-link" @click="addArrayFileOrDirectory()">
              <i class="fa fa-plus"></i> New {{ inputArrayItemsType }}
            </button>
          </div>
        </div>
      </template>

      <!--Unknown-->
      <template v-else> Unknown input type: {{ inputType || 'null' }} </template>
    </div>
    <input-value-editor-modal ref="fileMetadata" />
  </div>
</template>

<script type="text/babel">
  import InputValueEditorModal from '@/pages/application/_components/graph/InputValueEditorModal'
  import NativeFileBrowserFormField from '@/pages/application/_components/graph/NativeFileBrowserFormField'
  import { FormArray, FormControl, FormGroup } from '@/pages/application/_components/FormControl'

  export default {
    name: 'InputValueEditor',
    components: { InputValueEditorModal, NativeFileBrowserFormField },
    props: {
      readonly: {
        type: Boolean,
        default: false,
      },
      inputType: {
        type: String,
        default: '',
      },
      inputArrayItemsType: {
        type: String,
        default: '',
      },
      inputEnumSymbols: {
        type: Array,
        default() {
          return []
        },
      },
      inputRecordFields: {
        type: Array,
        default() {
          return []
        },
      },
      relativePathRoot: {
        type: String,
        default: '',
      },
      formControl: {
        type: Object,
        default() {
          return new FormControl(null)
        },
      },
    },
    data() {
      return {
        warning: undefined,
        metadataKeysCount: 0,
        secondaryFilesCount: 0,
        control: null,
      }
    },
    computed: {
      actualValue: {
        get() {
          return this.control?.value
        },
        set(value) {
          // eslint-disable-next-line no-console
          console.log('set actualValue', value)
          // TODO 修改数据更新方式
          this.formControl.setValue(value)
          this.recalculateSecondaryFilesAndMetadataCounts()
          // this.$emit('onUpdate', value)
        },
      },
      changeInput() {
        return [this.inputType, this.inputRecordFields]
      },
    },
    watch: {
      changeInput: {
        immediate: true,
        handler() {
          this.setupFormControls()
        },
      },
      inputType: {
        immediate: true,
        handler() {
          this.bindValuePropagationOnControlSetup()
        },
      },
      readonly() {
        if (this.readonly) {
          this.control.disable({ onlySelf: true, emitEvent: false })
        } else {
          this.control.enable({ onlySelf: true, emitEvent: false })
        }
      },
      'formControl.value': {
        // TODO 修改数据传输方式
        immediate: true,
        handler() {
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
        },
      },
    },
    mounted() {
      // this.arrayElements.changes.subscribeTracked(this, (list) => {
      //   const plainInputTypes = ['boolean', 'float', 'int', 'string', 'enum']
      //   if (plainInputTypes.includes(this.inputArrayItemsType) && list.last) {
      //     list.last.focus()
      //   }
      // })
    },
    methods: {
      // 为了使用 default，switch 功能组件需要升级到 vue3
      isSingleInputTypes() {
        return ['enum', 'int', 'float', 'string', 'boolean', 'map', 'File', 'Directory'].includes(this.inputType)
      },
      isInputType(type) {
        return this.inputType === type
      },
      clear() {
        this.control?.setValue(null)
      },
      addArrayEntry() {
        this.warning = undefined
        const control = this.makeControlForArray()
        this.control?.push(control)
      },
      deleteFromArray(index, control = this.control) {
        control.removeAt(index)
      },
      focus() {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      },
      addArrayFileOrDirectory() {
        const properties = ['multiSelections']
        properties.push(this.inputArrayItemsType === 'File' ? 'openFile' : 'openDirectory')
        this.native.openFileChoiceDialog({ properties }).then((filePaths) => {
          const fileOrDirEntries = filePaths.map((p) => ({ class: this.inputArrayItemsType, path: p }))
          fileOrDirEntries.forEach((entry) => this.control.push(new FormControl(entry)))
          this.cdr.markForCheck()
        })
      },
      bindValuePropagationOnControlSetup() {
        // let typecheckedChange = change;
        // if (this.inputType === "int") {
        //   typecheckedChange = parseInt(change, 10);
        // } else if (this.inputType === "float") {
        //   typecheckedChange = isNaN(change) ? 0 : parseFloat(change);
        // }
        // this.propagateChange(typecheckedChange);
      },
      setupFormControls() {
        const disabled = this.readonly
        let control
        switch (this.inputType) {
          case 'array':
            control = new FormArray([])
            disabled ? control.disable() : control.enable()
            break
          case 'record':
            // eslint-disable-next-line no-case-declarations
            const controls = {}
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
      },
      patchArrayValue(update, options) {
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
          this.bindValuePropagationOnControlSetup()
        }
        this.control.setValue(update, options)
      },
      promptFileMetadata() {
        this.$refs.fileMetadata.showDialog(this.control.value, this.relativePathRoot)
      },
      makeControlForArray() {
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
      },
      recalculateSecondaryFilesAndMetadataCounts() {
        // eslint-disable-next-line no-prototype-builtins
        const ctrlVal = Object.prototype.isPrototypeOf(this.control.value) ? this.control.value : {}
        const { secondaryFiles, metadata } = ctrlVal
        this.secondaryFilesCount = Array.isArray(secondaryFiles) ? secondaryFiles.length : 0
        // eslint-disable-next-line no-prototype-builtins
        this.metadataKeysCount = Object.prototype.isPrototypeOf(metadata) ? Object.keys(metadata).length : 0
      },
      onChildUpdate(value, control) {
        control.setValue(value)
        this.formControl.setValue(this.control.value)
      },
    },
  }
</script>
