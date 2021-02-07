<template>
  <div class="el-collapse selection-step-inputs">
    <collapse-item v-for="group of inputGroups" :key="group.name" :title="group.name">
      <form>
        <div v-for="input of group.inputs" :key="input.id" class="input-box">
          <!--Label and port options-->
          <div class="el-row is-justify-space-between el-row--flex mb-05r">
            <label class="text-truncate" :title="input.label || input.id">
              <span v-if="!input.type.isNullable" class="text-danger">*</span>
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
                <i class="el-icon-info text-muted"></i>
              </el-tooltip>
              {{ input.label || input.id }}
              <span class="text-muted">({{ input.type.type }})</span>
            </label>
            <!--Port options for File and array of Files-->
            <div v-if="isType(input, ['File', 'Directory'])" class="el-col-auto">
              <span v-if="input.type.isNullable"> {{ input.isVisible ? 'Show' : 'Hide' }}</span>
              <el-switch
                v-if="input.type.isNullable"
                v-model="input.isVisible"
                :data-input="input.id"
                :disabled="readonly"
                inactive-color="#333333"
                @change="onPortOptionChange($event ? 'port' : 'default', input)"
              ></el-switch>
            </div>
            <!--Port options for all other types-->
            <div v-else class="input-control">
              <el-dropdown>
                <span>
                  {{ input.status }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu style="max-width: 200px">
                  <el-dropdown-item
                    v-for="c of dropDownPortOptions"
                    :key="c.value"
                    :command="c.value"
                    :class="{ active: input.status === c.value }"
                    @click="onPortOptionChange(input, c.value)"
                  >
                    <div>{{ c.caption }}</div>
                    <div class="text-muted small">{{ c.description }}</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!--Input-->
          <selection-input-entry
            v-if="!isType(input, 'File')"
            :input="input"
            :prefix="input.id"
            :value="input.default"
            :type="input.type"
            :readonly="readonly"
            @update="stepValueUpdate($event, input.id + '.default')"
          ></selection-input-entry>
          <!--Link Merge Method Group-->
          <div class="el-form-item">
            <label class="input-label text-muted">Link Merge Method</label>
            <link-merge-select
              :readonly="readonly"
              :value="input.linkMerge.value"
              @update="input.linkMerge.value = $event"
            ></link-merge-select>
          </div>
          <!--Connections-->
          <div class="connections">
            <!--No connections-->
            <div v-if="input.source.length === 0 && input.isVisible">
              <span v-if="input.type.isNullable" class="text-warning">
                <i class="el-icon-warning"></i> This port is not connected
              </span>
              <span v-else-if="!input.type.isNullable" class="text-danger">
                <i class="el-icon-error"></i> This required port is not connected
              </span>
            </div>
            <!--List of connections-->
            <div v-if="input.source.length > 0" class="text-muted">Connections: {{ input.source.join(', ') }}</div>
          </div>
          <!--Tooltip-->
        </div>
      </form>
    </collapse-item>
  </div>
</template>

<script type="text/babel">
  import CollapseItem from '@/pages/application/_components/CollapseItem'
  import LinkMergeSelect from '@/pages/application/_components/LinkMergeSelect'
  import { ObjectHelper } from '@/pages/application/_components/ObjectHelper'
  import SelectionInputEntry from '@/pages/application/_components/SelectionInputEntry'

  export default {
    name: 'SelectionStepInputs',
    components: { LinkMergeSelect, SelectionInputEntry, CollapseItem },
    props: {
      step: {
        type: Object,
        default: null,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        dropDownPortOptions: [
          {
            value: 'default',
            caption: 'Default',
            description: 'Set default value for execution',
          },
          {
            value: 'exposed',
            caption: 'Exposed',
            description: 'Set value with the option to edit on the test page',
          },
          {
            value: 'port',
            caption: 'Port',
            description: 'Get value from another node on the canvas',
          },
        ],
      }
    },
    computed: {
      inputGroups() {
        // Whenever inputs are updated, regroup them and sort them for display
        const grouped = this.step.in.reduce((acc, item) => {
          // eslint-disable-next-line no-console
          const group = this.isType(item, 'File') ? 'Files' : 'App parameters'
          return Object.assign(acc, group ? { [group]: (acc[group] || []).concat(item) } : null)
        }, {})
        // eslint-disable-next-line no-console
        console.log(grouped)
        // Order groups
        return Object.keys(grouped)
          .sort((a, b) => b.localeCompare(a))
          .map((key) => ({
            name: key,
            inputs: grouped[key],
          }))
      },
    },
    methods: {
      isType(input, types) {
        if (typeof types === 'string') {
          types = [types]
        }
        return !!types.find((type) => {
          return input.type.type === type || input.type.items === type
        })
      },
      hasMetadata(input) {
        return (
          input.description ||
          input.fileTypes.length ||
          input.customProps['sbg:toolDefaultValue'] ||
          input.customProps['sbg:altPrefix']
        )
      },
      stepValueUpdate(value, prefix) {
        // Get top level id from prefix
        const inputId = prefix.split('.')[0]
        const input = this.step.in.find((i) => i.id === inputId)
        // Show a message in the status bar about what's changed.
        // this.statusBar.instant(`Updated step value of ${input ? input.label || input.id : inputId}.`)

        // If input.default is undefined assign empty object to avoid breaking up addProperty function
        input.default = input.default || {}
        // Assign the given value to the step key
        ObjectHelper.addProperty(this.step.inAsMap, prefix, value)
        this.$emit('update')
      },
      onPortOptionChange(value, input) {
        switch (value) {
          case 'default':
            // this.workflow.model.clearPort(input)
            break
          case 'exposed':
            // this.workflow.model.exposePort(input)
            break
          case 'port':
            // this.workflow.model.includePort(input)
            break
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet">
  $black: #232323;
  $dark-gray: #303030;
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
    border: 1px solid $black;
    border-radius: 0;
    &:focus {
      color: #eee;
      background-color: #333333;
      border-color: #66afe9;
      outline: none;
    }
  }
  select.form-control,
  input.form-control {
    &:not([size]):not([multiple]) {
      height: calc(2.5rem - 2px);
    }
  }
  .selection-step-inputs {
    color: #eee;
    .el-form-item {
      margin-bottom: 1rem;
    }
    label {
      display: inline-block;
      margin-bottom: 0.5rem;
    }
    .el-switch__core {
      border-color: $black !important;
    }
    .input-box {
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid $black;
    }
  }
</style>
