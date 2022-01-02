<template>
  <div class="selection-step-hints">
    <el-button type="dark" size="mini" :disabled="readonly" @click="setHints()"> {{ readonly ? 'View' : 'Set' }} Hints </el-button>
    <el-dialog :title="(readonly ? 'View' : 'Set') + 'Hints'" :visible.sync="dialogVisible" center width="60%" class="el-dialog-dark">
      <div class="dialog-body">
        <!--Blank Tool Screen-->
        <div v-if="!readonly && !hints.length">
          <div class="m-b-1">
            Set execution hints and their values, which specify the requirements and preferences for execution. For instance, use hints to specify the
            type of AWS instance to execute your task.
          </div>
          <div class="m-b-05 text-center">
            <el-button type="primary" size="small" @click="addEntry()"> Add a Hint </el-button>
          </div>
          <div class="text-center">
            <el-link type="primary" href="http://docs.sevenbridges.com/docs/list-of-execution-hints" target="_blank"> Learn More </el-link>
          </div>
        </div>
        <div v-if="readonly && !hints.length" class="text-xs-center">No hints are specified for this tool</div>
        <!--List Header Row-->
        <div v-if="!!hints.length" class="editor-list-title">
          <div class="col-xs-6">Class</div>
          <div class="col-xs-6">Value</div>
        </div>
        <form v-if="hints.length" @submit.prevent>
          <ul class="editor-list">
            <li v-for="(control, i) of hints" :key="i">
              <div class="flex-row">
                <!--TODO Set Hints-->
                ct-requirement-input
                <!--Actions Column-->
                <div v-if="!readonly" class="remove-icon">
                  <el-tooltip :content="$t('btn.delete')">
                    <i class="el-icon-delete pointer" @click="removeEntry(i)" />
                  </el-tooltip>
                </div>
              </div>
            </li>
          </ul>
        </form>
        <!--Add entry link-->
        <el-button v-if="!readonly && !!hints.length" type="primary" icon="el-icon-plus" size="small" @click="addEntry()"> Add a Hint </el-button>
      </div>
      <div slot="footer" class="dialog-footer text-right">
        <el-button type="dark" size="small" @click="dialogVisible = false"> Close </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { WorkflowInputParameterModel, WorkflowOutputParameterModel } from 'cwlts/models'

@Component
export default class SelectionStepHints extends Vue {
  @Prop({ default: false })
  readonly!: boolean
  @Prop({ required: true })
  step!: any

  hints = []
  dialogVisible = false

  @Watch('step.hints', { immediate: true })
  onWatchStepHints(hints?: any): void {
    if (hints) {
      this.hints = hints.map((h: any) => {
        return { class: h.class, value: h.value }
      })
    }
  }

  addEntry(): void {
    this.step.addHint({ class: '', value: '' })
  }
  setHints(): void {
    this.dialogVisible = true
  }
  removeEntry(): void {
    console.log()
  }
}
</script>
