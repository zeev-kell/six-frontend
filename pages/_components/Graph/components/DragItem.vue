<template>
  <div v-popover:popover draggable="true" :class="itemClass" @click="onClick" @dragstart="onDragStart($event)" @dragend="onDragEnd()">
    <slot>
      <fa v-if="isTool" icon="terminal"></fa>
      <i v-else class="el-icon-share text-warning"></i>
      <span class="item-name" :title="item.name || item.pipe_name">{{ item.name || item.pipe_name }}</span>
    </slot>
    <div style="position: fixed; top: -1000px">
      <div ref="image" :class="imageClass"></div>
    </div>
    <el-popover v-model="showPopper" ref="popover" placement="bottom-start" trigger="click" :offset="80" width="400" popper-class="el-popover-dark">
      <el-table :data="tableData" size="mini">
        <el-table-column label="名称" prop="name" width="120">
          <template slot-scope="{ row }">
            <nuxt-link v-slot="{ href }" class="text-truncate" :to="localePath('/application/pipe/' + row['resource_id'])" :title="row.name" custom>
              <a class="pointer" target="_blank" :href="href">{{ row.name }}</a>
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column label="类别" prop="type" width="60">
          <template slot-scope="{ row }">
            {{ row.type | pipeTypeTranslate | t }}
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="category" width="100" />
        <el-table-column label="最近版本" prop="version" width="120" />
        <el-table-column label="介绍" prop="description" width="300">
          <template slot-scope="{ row }">
            {{ row.description | intercept(22) }}
          </template>
        </el-table-column>
      </el-table>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import intercept from '@/filters/intercept'

@Component({
  filters: {
    ...intercept,
    pipeTypeTranslate: pipeConstants.get,
  },
})
export default class DragItem extends Vue {
  $refs!: {
    image: Element
  }

  @Prop({ required: true })
  item!: PipeModel

  itemClass = ''
  showPopper = false

  get isTool(): boolean {
    return this.item.type === pipeConstants.items.TYPE_TOOL
  }
  get imageClass(): string {
    return 'icon-' + (this.isTool ? 'tool' : 'workflow')
  }
  get tableData(): any[] {
    const _item = Object.assign(
      {
        name: this.item.name || this.item.pipe_name,
      },
      this.item
    )
    return [_item]
  }

  @Watch('$store.state.system.popoverTime')
  onWatchPopoverTime(): void {
    if (this.showPopper) {
      this.showPopper = false
    }
  }

  onClick(): void {
    if (!this.$el.classList.contains('selected')) {
      document.querySelectorAll('.drag-item.selected').forEach((d) => d.classList.remove('selected'))
    }
    this.$el.classList.add('selected')
  }
  onDragStart(event: DragEvent): void {
    const transfer = event.dataTransfer
    if (transfer === null) {
      return
    }
    this.itemClass = 'drag-active'
    this.$store.commit('system/SET_DRAG_TOOL_ITEM', this.item)
    this.$store.commit('system/SET_POPOVER_TIME')
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
