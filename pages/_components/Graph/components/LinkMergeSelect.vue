<template>
  <select v-model="actualValue" class="form-control" :disabled="readonly">
    <option value="">-- {{ $t('common.none') }} --</option>
    <option value="merge_nested">{{ $t('graph.merge_nested') }}</option>
    <option value="merge_flattened">{{ $t('graph.merge_flattened') }}</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LinkMergeSelect extends Vue {
  @Prop({ required: true })
  value!: any
  @Prop({ default: false })
  readonly!: boolean

  get actualValue() {
    return this.value === null || this.value === undefined ? '' : this.value
  }
  set actualValue(value) {
    this.value = value
    this.$emit('input', value)
  }
}
</script>
