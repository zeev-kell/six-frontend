<template>
  <li class="list-item">
    <div class="d-flex">
      <span
        v-if="item.versions.length"
        class="el-tree-node__expand-icon el-icon-caret-right"
        :class="{ expanded: expanded }"
        @click="expanded = !expanded"
      ></span>
      <drag-item :item="item" class="el-col-full drag-item"></drag-item>
    </div>
    <el-collapse-transition>
      <div v-show="expanded" class="p-l-1">
        <drag-item v-for="v of item.versions" :key="v.id" :item="v" class="drag-item">
          <fa v-if="v.type === TYPE_TOOL" icon="terminal"></fa>
          <i v-else class="el-icon-share text-warning"></i>
          {{ v.version }}
          <el-tag v-if="item.pipe_id === v.resource_id" size="mini" type="dark"> default </el-tag>
        </drag-item>
      </div>
    </el-collapse-transition>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PipeModel } from '@/types/model/Pipe'
import DragItem from '@/pages/_components/Graph/components/DragItem.vue'
import { pipeConstants } from '@/constants/PipeConstants'

@Component({
  components: { DragItem },
})
export default class DragItemCollapse extends Vue {
  @Prop({ required: true })
  item!: PipeModel

  TYPE_TOOL = pipeConstants.items.TYPE_TOOL

  expanded = false
}
</script>
