<template>
  <div>
    <div v-for="(m, i) of metadata" :key="i" class="el-row el-row--flex mt-10-a list-item is-align-middle">
      <el-input v-model="m.key" placeholder="key" @input="onChange"></el-input>
      <span class="add-on">:</span>
      <el-input v-model="m.value" placeholder="value" @input="onChange"></el-input>
      <el-tooltip v-if="!readonly" :content="$t('btn.delete')">
        <i class="el-icon-delete pointer remove-icon" @click="remove(i)" />
      </el-tooltip>
    </div>
    <div v-if="metadata.length === 0 && !readonly" class="text-center">
      <p>{{ $t('graph.no_entries_defined') }}</p>
      <el-button size="mini" type="primary" @click="add()">添加元数据</el-button>
    </div>
    <el-button v-if="metadata.length !== 0 && !readonly" icon="el-icon-plus" size="mini" type="text" class="mt-5" @click="add()">
      添加元数据
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import debounce from '@/utils/debounce'
interface meta {
  key: string
  value: string
  disable?: boolean
}

@Component
export default class MapList extends Vue {
  @Prop({ default: false })
  readonly!: boolean
  @Prop({ required: true })
  value!: any

  metadata: meta[] = []

  add(): void {
    this.metadata.push({
      key: '',
      value: '',
      disable: this.readonly,
    })
  }
  remove(i: number) {
    this.metadata.splice(i, 1)
    this.onChange()
  }
  onChange = debounce(() => {
    this.$emit('input', this.getMetadata())
  }, 500)
  setMetaDate(value: any): void {
    if (value === null) {
      this.add()
    } else {
      this.metadata = this.convertToKVArray(value)
    }
  }
  getMetadata(): any {
    return this.metadata.reduce((obj, m: meta) => {
      let { key, value } = m
      key = String(key).trim()
      value = String(value).trim()
      if (key === '' && value === '') {
        return obj
      }
      return { ...obj, [key]: value }
    }, {})
  }
  convertToKVArray(obj: any = {}): { key: string; value: string }[] {
    const patch = []
    for (const k in obj) {
      const key = k === undefined || k === null ? '' : k.toString()
      const value = obj[k] === undefined || obj[k] === null ? '' : obj[k].toString()
      patch.push({ key, value })
    }
    return patch
  }
  mounted(): Promise<any> | void {
    this.setMetaDate(this.value)
  }
}
</script>

<style scoped lang="scss">
.add-on {
  flex-basis: 20px;
  padding: 0 0.55rem;
}
.list-item ::v-deep .el-input__inner {
  color: #eee;
}
</style>
