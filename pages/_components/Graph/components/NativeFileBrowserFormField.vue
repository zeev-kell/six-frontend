<template>
  <input v-model="actualValue" class="form-control" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { FormControl } from '@/components/FormControl'

@Component
export default class NativeFileBrowserFormField extends Vue {
  @Prop({
    default() {
      return new FormControl(null)
    },
  })
  formControl!: any
  @Prop({ default: '' })
  selectionType!: string

  get actualValue() {
    return this.formControl?.value
  }
  set actualValue(value) {
    // TODO 修改数据更新方式
    this.$emit('onUpdate', value)
  }
}
</script>
