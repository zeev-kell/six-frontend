<template>
  <div class="graph-edit-warning">
    <el-dialog title="异常" width="75%" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false">
      <div v-if="validationState">
        <p v-if="!errors.length && !warnings.length">No issues found.</p>
        <p v-for="(error, index) of errors" :key="index" class="text-console-error">
          {{ error.loc ? error.loc + ': ' : '' }}
          {{ error.message }}
        </p>
        <p v-for="(warning, index) of warnings" :key="index" class="text-console-warning">
          {{ warning.loc ? warning.loc + ': ' : '' }}
          {{ warning.message }}
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('btn.close') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import DialogResetForm from '@/pages/_components/DialogResetForm.vue'
import { AppValidityState } from '@/pages/_components/Graph/types'
import { Issue } from 'cwlts/models'

@Component
export default class GraphEditWarning extends DialogResetForm {
  validationState: AppValidityState = {
    isValidCWL: false,
    isPending: true,
    errors: [],
    warnings: [],
  }

  showDialog(validationState: AppValidityState): void {
    this.validationState = validationState
    this.dialogVisible = true
  }

  get errors(): Issue[] {
    return this.validationState?.errors || []
  }

  get warnings(): Issue[] {
    return this.validationState?.warnings || []
  }

  resetFields(): void {
    ;(this.validationState as any) = null
  }
}
</script>
