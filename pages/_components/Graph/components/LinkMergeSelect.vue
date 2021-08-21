<template>
  <select v-model="actualValue" class="form-control" :disabled="readonly">
    <option value="">-- none --</option>
    <option value="merge_nested">Nested</option>
    <option value="merge_flattened">Flattened</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LinkMergeSelect extends Vue {
  @Prop
  value: any = null
  @Prop({ default: false })
  readonly!: boolean

  get actualValue() {
    return this.value === null || this.value === undefined ? '' : this.value
  }
  set actualValue(value) {
    this.$emit('onUpdate', value)
  }
}
</script>
