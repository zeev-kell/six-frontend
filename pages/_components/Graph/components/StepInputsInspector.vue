<template>
  <div class="el-collapse selection-step-inputs">
    <collapse-item v-for="group of inputGroups" :key="group.name" :title="'graph.' + group.name">
      <form @submit.prevent>
        <div v-for="input of group.inputs" :key="input.id" class="input-box py-10">
          <!--Label and port options-->
          <div class="el-row is-justify-space-between el-row--flex m-b-05 is-align-middle">
            <label class="text-truncate" :title="input.label || input.id">
              <span v-if="!input.type.isNullable" class="text-danger mr-2">*</span>
              <el-tooltip v-if="hasMetadata(input)" :visible-arrow="false" popper-class="input-popper">
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
            <link-merge-select :readonly="readonly" :value="input.linkMerge.value" @onUpdate="input.linkMerge.value = $event" />
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
              <div v-if="input.source.length > 0" class="text-muted">{{ $t('cwl.Connections') }}: {{ input.source.join(', ') }}</div>
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
import LinkMergeSelect from '@/pages/application/_components/graph/LinkMergeSelect.vue'

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
<style lang="scss" rel="stylesheet">
@import '../theme';
.el-tooltip__popper.input-popper {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  max-width: 500px;

  .title {
    margin-bottom: 0.78571rem;
    display: block;
    font-weight: bold;
  }

  .indent {
    padding-left: 1.57143rem;
  }

  .value {
    margin-bottom: 1.57143rem;
    display: block;
  }
}
.input-box {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ebeef5;
  &:last-of-type {
    border-bottom: transparent;
  }
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.4rem 0.55rem;
  font-size: 12px;
  line-height: 1rem;
  color: #eee;
  background-color: #333333;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid $black1;
  border-radius: 0;
  &:focus {
    color: #eee;
    background-color: #333333;
    border-color: #66afe9;
    outline: none;
  }

  @include scroll-bar();
}
select.form-control,
input.form-control {
  &:not([size]):not([multiple]) {
    height: calc(2.5rem - 2px);
  }
}
.selection-step-inputs {
  border: none;
  color: #eee;
  .el-form-item {
    margin-bottom: 1rem;
  }
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  .el-switch__core {
    border-color: $black1 !important;
  }
}
.input-dropdown-menu {
  max-width: 220px;
  background: #333333;
  border: 1px solid #232323;
  border-radius: 2px;
  padding: 0;
  color: #eee;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
  .el-dropdown-menu__item {
    line-height: 1.5;
    margin-top: 0;
    border-top: 1px solid #232323;
    padding: 0.55rem 1rem;
    color: inherit;
    &:focus,
    &:not(.is-disabled):hover {
      background: #3c3c3c;
      color: inherit;
    }
  }
  .popper__arrow {
    border-bottom-color: $black1 !important;
    border-top-color: $black1 !important;
  }
  .popper__arrow::after {
    border-top-color: $black2 !important;
    border-bottom-color: $black2 !important;
  }
}
</style>
