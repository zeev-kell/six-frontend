<template>
  <div class="validation-report">
    <transition name="el-zoom-in-bottom">
      <div v-show="show" class="p-10 content">
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
      </div>
    </transition>
    <div class="p-10 pointer action-box text-right" @click="show = !show">
      问题
      <span v-if="errors.length" class="text-danger"> <i class="el-icon-error"></i> {{ errors.length }} Error(s) </span>
      <span v-if="warnings.length" class="text-warning"> <i class="el-icon-warning"></i> {{ warnings.length }} Warning(s) </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AppValidityState } from '@/types/graph'
import { Issue } from 'cwlts/models'

@Component
export default class ValidationReport extends Vue {
  show = false

  get validationState(): AppValidityState {
    return this.$store.state.graph.validationState
  }
  get errors(): Issue[] {
    return this.validationState?.errors || []
  }
  get warnings(): Issue[] {
    return this.validationState?.warnings || []
  }
}
</script>
