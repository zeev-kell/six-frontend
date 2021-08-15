<template>
  <li class="list-item">
    <div class="d-flex">
      <span
        v-if="item.versions.length"
        class="el-tree-node__expand-icon el-icon-caret-right"
        :class="{ expanded: expanded }"
        @click="expanded = !expanded"
      ></span>
      <drag-item :item="item" class="el-col-full item-padding"></drag-item>
    </div>
    <el-collapse-transition>
      <div v-show="expanded" class="p-l-1">
        <drag-item v-for="v of item.versions" :key="v.id" :item="v" class="item-padding"></drag-item>
      </div>
    </el-collapse-transition>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { PipeModel } from '@/types/model/Pipe'
import DragItem from '@/pages/_components/Graph/components/DragItem.vue'

@Component({
  components: { DragItem },
})
export default class DragItemCollapse extends Vue {
  @Prop({ required: true })
  item!: PipeModel

  expanded = false
}
</script>
