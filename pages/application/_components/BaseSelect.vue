<template>
  <el-select
    ref="elSelect"
    v-model="actualValue"
    v-loading="loading"
    :placeholder="defaultPlaceholder"
    clearable
    filterable
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option v-for="option in options" :key="option.id" :label="option.label" :value="option.value" />
  </el-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SelectModel } from '@/types/model/Common'
import { ElSelect } from 'element-ui/types/select'

@Component
export default class BaseSelect extends Vue {
  $refs!: {
    elSelect: ElSelect
  }
  @Prop({ required: true })
  value!: any
  loading = true
  options: SelectModel[] = []
  defaultPlaceholder = ''

  get actualValue() {
    return this.value
  }
  set actualValue(value) {
    this.$emit('input', value)
  }

  getOptions(): Promise<SelectModel[]> {
    return Promise.resolve([])
  }
  blur(): void {
    this.$refs.elSelect.blur()
  }

  async mounted(): Promise<any> {
    this.defaultPlaceholder = this.$attrs.placeholder || this.defaultPlaceholder
    this.loading = true
    this.options = await this.getOptions().finally(() => {
      this.loading = false
    })
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-loading-mask {
  background: rgb(255 255 255 / 0.5);
  .el-loading-spinner {
    max-height: 100%;
    margin-top: -16px;

    .circular {
      height: 32px;
      width: 32px;
    }
  }
}
</style>
