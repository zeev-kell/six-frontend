<template>
  <div class="">
    <div v-if="children.length === 0 && !readonly">
      <div class="el-row text-center m-b-1">
        <div class="el-col-22 el-col-offset-1">
          <span v-if="title">{{ title }}</span>
          {{ description }}
          <div>No entries defined</div>
        </div>
      </div>
      <div v-if="!readonly" class="el-row text-center m-b-1">
        <el-button v-if="children.length === 0" type="text" size="mini" @click="onAdd"> Add an entry </el-button>
      </div>
    </div>
    <div v-for="(ctrl, index) of children" :key="index" class="el-row--flex text-center m-b-05 is-align-middle">
      <input v-model="ctrl.key" class="form-control" placeholder="key" />
      <span class="f-b-20">:</span>
      <input v-model="ctrl.value" class="form-control" placeholder="value" />
      <el-tooltip v-if="!readonly" content="Delete">
        <el-button icon="el-icon-delete" type="text" @click="onRemove(index)" />
      </el-tooltip>
    </div>
    <el-button v-if="children.length !== 0 && !readonly" type="text" size="mini" @click="onAdd"> <i class="el-icon-plus" /> Add an Entry </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SelectionInputEntryMap extends Vue {
  @Prop({ default: null })
  value!: any
  @Prop({ default: false })
  readonly!: boolean
  @Prop({ default: '' })
  description!: string
  @Prop({ default: '' })
  title!: string

  children = [{ key: 'k', value: 'v' }]

  onRemove(i: any) {
    this.children.splice(i, 1)
  }
  onAdd() {
    this.children.push({ key: 'k', value: 'v' })
  }
}
</script>
