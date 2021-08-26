<template>
  <div class="el-collapse selection-step-inputs">
    <collapse-item v-for="group of inputGroups" :key="group.name" :title="'graph.' + group.name">
      <form @submit.prevent>
        <div v-for="input of group.inputs" :key="input.id" class="input-box py-10">
          <!--Label and port options-->
          <div class="el-row is-justify-space-between el-row--flex m-b-05 is-align-middle">
            <label class="text-truncate" :title="input.label || input.id">
              <span v-if="!input.type.isNullable" class="text-danger mr-2">*</span>
              <el-tooltip v-if="hasMetadata(input)" :visible-arrow="false" popper-class="input-tooltip-popper">
                <div slot="content">
                  <h2>{{ input.label || input.id }}</h2>
                  <!--Description-->
                  <div v-if="input.description" class="value">
                    {{ input.description }}
                  </div>
                  <div v-if="input.customProps['sbg:toolDefaultValue']">
                    <span class="title">Suggested Value:</span>
                    <span class="value indent">{{ input.customProps['sbg:toolDefaultValue'] }}</span>
                  </div>
                  <div v-if="input.fileTypes.length">
                    <span class="title">Suggested File Types: </span>
                    <span class="value indent">
                      {{ (input.fileTypes || []).join(',') }}
                    </span>
                  </div>
                  <div v-if="input.customProps['sbg:altPrefix']">
                    <span class="title">Alternative Command Line Prefix: </span>
                    <span class="value indent">
                      {{ input.customProps['sbg:altPrefix'] }}
                    </span>
                  </div>
                </div>
                <i class="el-icon-info text-muted" />
              </el-tooltip>
              <span :title="input.label || input.id"> {{ input.label || input.id }} </span>
              <span class="text-muted">({{ input.type.type }})</span>
            </label>
            <!--Port options for File and array of Files-->
            <div v-if="isType(input, ['File', 'Directory'])" class="el-col-auto">
              <span v-if="input.type.isNullable"> {{ input.isVisible ? 'Show' : 'Hide' }}</span>
              <el-switch
                v-if="input.type.isNullable"
                :value="input.isVisible"
                :disabled="readonly"
                inactive-color="#333333"
                @change="onPortOptionChange($event ? 'port' : 'default', input)"
              />
            </div>
            <!--Port options for all other types-->
            <div v-else class="input-control el-col-auto">
              <el-dropdown trigger="click" @command="onPortOptionChange($event, input)">
                <span class="pointer">
                  {{ input.status }}
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown" class="input-dropdown-menu">
                  <el-dropdown-item
                    v-for="c of dropDownPortOptions"
                    :key="c.value"
                    :command="c.value"
                    :disabled="readonly"
                    :class="{ active: input.status === c.value }"
                  >
                    <div>{{ c.caption }}</div>
                    <div class="text-muted small">
                      {{ c.description }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!--Input-->
          <workflow-step-inspector-entry
            v-if="!isType(input, 'File')"
            :input="input"
            :prefix="input.id"
            :value="input.default"
            :type="input.type"
            :readonly="readonly"
            @onUpdate="stepValueUpdate($event, input.id + '.default')"
          />
          <!--Link Merge Method Group-->
          <div class="el-form-item">
            <label class="input-label text-muted">Link Merge Method</label>
            <link-merge-select v-model="input.linkMerge.value" :readonly="readonly" />
          </div>
          <!--Connections-->
          <div class="connections">
            <transition name="el-zoom-in-top">
              <!--No connections-->
              <div v-if="input.source.length === 0 && input.isVisible">
                <span v-if="input.type.isNullable" class="text-warning"> <i class="el-icon-warning" /> This port is not connected </span>
                <span v-else-if="!input.type.isNullable" class="text-danger"> <i class="el-icon-error" /> This required port is not connected </span>
              </div>
            </transition>
            <transition name="el-zoom-in-top">
              <!--List of connections-->
              <div v-if="input.source.length > 0" class="text-muted">{{ $t('graph.Connections') }}: {{ input.source.join(', ') }}</div>
            </transition>
          </div>
          <!--Tooltip-->
        </div>
      </form>
    </collapse-item>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue } from 'nuxt-property-decorator'
import { StepModel, WorkflowModel } from 'cwlts/models'
import { WorkflowStepInputModel } from 'cwlts/models/generic/WorkflowStepInputModel'
import CollapseItem from '@/components/CollapseItem.vue'
import WorkflowStepInspectorEntry from '@/pages/_components/Graph/components/WorkflowStepInspectorEntry.vue'
import { ObjectHelper } from '@/pages/_components/Graph/helpers/ObjectHelper'
import LinkMergeSelect from '@/pages/_components/Graph/components/LinkMergeSelect.vue'

@Component({
  components: { LinkMergeSelect, WorkflowStepInspectorEntry, CollapseItem },
})
export default class StepInputsInspector extends Vue {
  @InjectReactive('model')
  model!: WorkflowModel

  @Prop({ required: true })
  step!: StepModel
  @Prop({ default: false })
  readonly!: boolean

  dropDownPortOptions = [
    {
      value: 'default',
      caption: 'Default',
      description: 'Set default value for execution',
    },
    // {
    //   value: 'exposed',
    //   caption: 'Exposed',
    //   description: 'Set value with the option to edit on the test page',
    // },
    {
      value: 'port',
      caption: 'Port',
      description: 'Get value from another node on the canvas',
    },
  ]

  get inputGroups(): { name: string; inputs: WorkflowStepInputModel[] }[] {
    const grouped = this.step.in.reduce((acc: { [index: string]: WorkflowStepInputModel[] }, item) => {
      const group = this.isType(item, 'File') ? 'Files' : 'app_parameters'
      return Object.assign(acc, group ? { [group]: (acc[group] || []).concat(item) } : null)
    }, {})
    return Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .map((key) => ({
        name: key,
        inputs: grouped[key],
      }))
  }

  isType(input: WorkflowStepInputModel, types: string | string[]): boolean {
    if (typeof types === 'string') {
      types = [types]
    }
    return !!types.find((type) => {
      return input.type.type === type || input.type.items === type
    })
  }
  hasMetadata(input: WorkflowStepInputModel): boolean {
    return input.description || input.fileTypes.length || input.customProps['sbg:toolDefaultValue'] || input.customProps['sbg:altPrefix']
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  stepValueUpdate(value: any, prefix: string): void {
    // Get top level id from prefix
    const inputId = prefix.split('.')[0]
    const input = this.step.in.find((i) => i.id === inputId) as WorkflowStepInputModel
    // Show a message in the status bar about what's changed.
    // this.statusBar.instant(`Updated step value of ${input ? input.label || input.id : inputId}.`)

    // If input.default is undefined assign empty object to avoid breaking up addProperty function
    if (!input.default) {
      input.default = {}
    }
    // Assign the given value to the step key
    ObjectHelper.addProperty(this.step.inAsMap, prefix, value)
    this.$emit('onUpdate')
  }
  onPortOptionChange(value: string, input: WorkflowStepInputModel): void {
    switch (value) {
      case 'default':
        this.model.clearPort(input)
        break
      case 'exposed':
        this.model.exposePort(input)
        break
      case 'port':
        this.model.includePort(input)
        break
    }
  }
}
</script>
