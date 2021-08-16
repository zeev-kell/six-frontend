<template>
  <div draggable="true" :class="itemClass" @dragstart="onDragStart($event)" @dragend="onDragEnd()">
    <fa v-if="isTool" icon="terminal"></fa>
    <i v-else class="el-icon-share text-warning"></i>
    <span class="item-name" :title="item.name || item.pipe_name">{{ item.name || item.pipe_name }}</span>
    <div style="position: fixed; top: -1000px">
      <div ref="image" :class="imageClass"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'

@Component
export default class DragItem extends Vue {
  $refs!: {
    image: Element
  }

  @Prop({ required: true })
  item!: PipeModel

  itemClass = ''

  get isTool(): boolean {
    return this.item.type === pipeConstants.items.TYPE_TOOL
  }
  get imageClass(): string {
    return 'icon-' + (this.isTool ? 'tool' : 'workflow')
  }

  onDragStart(event: DragEvent): void {
    const transfer = event.dataTransfer
    if (transfer === null) {
      return
    }
    this.itemClass = 'drag-active'
    this.$store.commit('system/SET_DRAG_TOOL_ITEM', this.item)
    // Set the allowed effects
    transfer.effectAllowed = 'copy'
    // Set the drag image
    transfer.setDragImage(this.$refs.image, 30, 30)
    transfer.setData('text', '')
    // 不加这句firefox不出现拖拽图标
    transfer.setData('text/plain', '')
  }
  onDragEnd(): void {
    this.$store.commit('system/SET_DRAG_TOOL_ITEM', null)
    this.itemClass = ''
  }
}
</script>
