<!--suppress ALL -->
<template>
  <div class="selection-input-entry">
    <div v-if="warning" class="form-control-label">
      <span class="text-warning">
        <i class="el-icon-error" />
        {{ warning }}
      </span>
    </div>

    <div v-if="index !== -1 && input.type.type === 'map'">
      <span class="text-muted"> [{{ index }}] </span>
      <!--Delete button for array item if its a map-->
      <el-tooltip v-if="!readonly" content="Delete map array">
        <i class="el-icon-delete clickable" @click="deleteFromArray()" />
      </el-tooltip>
    </div>

    <div class="el-form-item" style="margin-bottom: 0">
      <!--Each leaf field will be wrapped as an input group-->
      <!--Nested fields below should not be wrapped into other container elements-->
      <!--because it will break size and positioning-->
      <div v-if="isSingleInputTypes()" class="el-row el-row--flex is-align-middle">
        <!--Enums-->
        <template v-if="isInputType('enum')">
          <select v-model="actualValue" class="form-control" :disabled="readonly">
            <option value="">-- none --</option>
            <option v-for="val of input.type.symbols" :key="val" :value="val">
              {{ val }}
            </option>
          </select>
        </template>

        <!--Numbers-->
        <template v-else-if="isInputType('int')">
          <el-input v-model="actualValue" type="number" :disabled="readonly" />
        </template>

        <template v-else-if="isInputType('float')">
          <el-input v-model="actualValue" type="number" :readonly="readonly" />
        </template>

        <!--Strings-->
        <template v-else-if="isInputType('string')">
          <el-input v-model="actualValue" :disabled="readonly" />
        </template>

        <!--Booleans-->
        <template v-else-if="isInputType('boolean')">
          <label class="clickable">
            <span>{{ actualBoolean ? 'Yes' : 'No' }}</span>
            <el-switch v-model="actualBoolean" :disabled="readonly" />
          </label>
        </template>

        <!--Maps-->
        <template v-else-if="isInputType('map')">
          <selection-input-entry-map :value="value" :readonly="readonly" @onUpdate="onUpdateJob" />
        </template>

        <!--Files and array of Files-->
        <template v-else-if="isInputType('File')">
          <span class="text-warning small"> Cannot set default values for type File and File[]. </span>
        </template>

        <!--Directories and array of Directories-->
        <template v-else-if="isInputType('Directory')">
          <span class="small text-muted"> Cannot set default values for type Directory and Directory[]. </span>
        </template>

        <!--Delete button for array item if its not a map-->
        <el-tooltip v-if="index !== -1 && input.type.type !== 'map' && !readonly" content="Delete" class="m-l-05 p-5">
          <i class="el-icon-delete" @click="deleteFromArray()" />
        </el-tooltip>
      </div>
      <!--Records-->
      <template v-else-if="isInputType('record')">
        <div v-for="entry of input.type.fields" :key="entry.id" class="m-l-1">
          <label>
            {{ entry.label || entry.id }}
            <span class="text-muted">({{ entry.type.type }})</span>
            <el-tooltip v-if="entry.description">
              <i class="el-icon-info text-muted" />
              <div slot="content">
                {{ entry.description }}
              </div>
            </el-tooltip>
          </label>
          <selection-input-entry
            :prefix="prefix + '.' + entry.id"
            :input="entry"
            :type="input.type"
            :value="value ? value[entry.id] : undefined"
            :readonly="readonly"
            @onUpdate="onUpdateRecord($event, entry.id)"
          />
        </div>
      </template>

      <!--Arrays-->
      <template v-else-if="isInputType('array')">
        <div v-for="(entry, i) of value" :key="i" class="array-row">
          <div class="array-entry">
            <workflow-step-inspector-entry
              :prefix="prefix + '.[' + i + ']'"
              :index="i"
              :type="input.type"
              :input="arrayModifiedInput"
              :value="entry"
              :readonly="readonly"
              @onUpdate="onUpdateArray($event, i)"
            />
          </div>
        </div>

        <el-button type="text" :disabled="readonly" size="mini" @click="addArrayEntry(input)">
          <i class="el-icon-circle-plus" /> New {{ input.type.items }}
        </el-button>
      </template>

      <!--Unknown-->
      <template v-else> Unknown input type: {{ inputType || 'null' }} </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WorkflowStepInputModel } from 'cwlts/models/generic/WorkflowStepInputModel'
import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import { ObjectHelper } from '@/pages/_components/Graph/helpers/ObjectHelper'

@Component
export default class WorkflowStepInspectorEntry extends Vue {
  @Prop({ required: true })
  input!: WorkflowStepInputModel
  @Prop({
    default() {
      return ''
    },
  })
  prefix!: string
  @Prop({
    default() {
      return ''
    },
  })
  value!: any
  @Prop({ default: false })
  readonly!: boolean
  @Prop({
    default() {
      return -1
    },
  })
  index!: number
  @Prop({
    default() {
      return ''
    },
  })
  type: string | any
  warning: string | null = null

  get inputType(): string {
    const inputType = this.input.type.type
    if (inputType === 'array') {
      if (this.input.type.items === 'File') {
        return 'File'
      }
    }
    return inputType
  }
  get actualValue(): string | null | undefined {
    return this.value
  }
  set actualValue(value: string | null | undefined) {
    this.$emit('onUpdate', value)
  }
  get actualString(): string {
    return this.value === null || this.value === undefined ? '' : this.value
  }
  set actualString(value: string) {
    this.$emit('onUpdate', value)
  }
  get actualBoolean(): boolean | string | null | undefined {
    return this.value === '' ? false : this.value
  }
  set actualBoolean(value: boolean | string | null | undefined) {
    this.$emit('onUpdate', value)
  }
  get arrayModifiedInput(): any {
    if (this.input.type.type === 'array' && this.input.type.items !== 'File') {
      return {
        ...this.input,
        type: {
          ...this.input.type,
          type: this.input.type.items,
          symbols: this.input.type.symbols,
        },
      }
    }
    return undefined
  }

  // 为了使用 default，switch 功能组件需要升级到 vue3
  isSingleInputTypes(): boolean {
    return ['enum', 'int', 'float', 'string', 'boolean', 'map', 'File', 'Directory'].includes(this.inputType)
  }
  isInputType(type: string): boolean {
    return this.inputType === type
  }
  deleteFromArray(): void {
    this.onUpdateJob(undefined)
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onUpdateJob(data: any): void {
    this.$emit('onUpdate', data)
  }
  onUpdateArray(data: undefined, index: number): void {
    // We need some kind of convention to broadcast information
    // that an array element should be deleted
    if (data === undefined) {
      this.onUpdateJob(this.value.filter((e: never, i: number) => i !== index))
      return
    }

    // This is tricky.
    // We need to update the original value in place, and cant replace its reference because
    // of the object inspector, which would still point to the previous entry.
    // We can't close and reopen the inspector because it would break the control focus.
    Object.keys(this.value[index]).forEach((item) => delete this.value[index][item])
    this.value[index] = Object.assign(this.value?.[index], data)

    this.onUpdateJob(this.value.slice())
  }
  addArrayEntry(input: WorkflowStepInputModel): void {
    ;(this.warning as unknown) = undefined
    const generatedEntry = JobHelper.generateMockJobData(input)
    this.onUpdateJob((this.value || []).concat(generatedEntry.slice(0, 1)))
  }
  onUpdateRecord(event: WorkflowStepInputModel, entryId: string): void {
    const data = { ...((this.value as any) || {}) }
    ObjectHelper.addProperty(data, entryId, event)
    const d = {
      ...data,
      [entryId]: Array.isArray(event) || ObjectHelper.isPrimitiveValue(event) ? event : { ...event },
    }
    this.onUpdateJob(d)
  }
}
</script>
