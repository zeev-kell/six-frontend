<template>
  <li draggable="true" :class="itemClass" @dragstart="onDragStart($event)" @dragend="onDragEnd()">
    {{ item.name }}
    <div style="position: fixed; top: -1000px">
      <div ref="image" :class="imageClass"></div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DragItem extends Vue {
  $refs!: {
    image: Element
  }
  @Prop({ required: true })
  item!: any
  @Prop({
    default() {
      return 'tool'
    },
  })
  readonly type: string | undefined
  itemClass = ''

  get imageClass(): string {
    return 'icon-' + this.type
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
