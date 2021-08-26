<template>
  <div class="drag-list-box h-100v">
    <div class="tool-box left">
      <div class="tool-group">
        <el-button type="dark" icon="el-icon-back" title="返回上一页" @click="actionGoBack"></el-button>
      </div>
      <can-create>
        <div class="tool-group">
          <el-button type="dark" icon="el-icon-upload" title="保存" @click="actionToCreate"></el-button>
        </div>
      </can-create>
      <div class="tool-group">
        <el-button type="dark" icon="el-icon-edit-outline" title="临时保存" @click="actionToSave"></el-button>
      </div>
      <div class="tool-group">
        <el-button type="dark" icon="el-icon-video-play" title="设置运行参数" @click="actionToRun"></el-button>
      </div>
    </div>
    <div class="list-panel h-100">
      <div class="toggle-button" :class="{ 'is-minimized': !showPanel }" @click.prevent="showPanel = !showPanel">
        <drag-list-box-toggle></drag-list-box-toggle>
      </div>
      <transition>
        <div v-show="showPanel" class="left-panel">
          <el-tabs v-model="activeName">
            <el-tab-pane label="应用商店" name="first">
              <drag-list-shop ref="dragListShop"></drag-list-shop>
            </el-tab-pane>
            <el-tab-pane label="我的应用" name="second">
              <drag-list-mine ref="dragListMine"></drag-list-mine>
            </el-tab-pane>
          </el-tabs>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DragListShop from '@/pages/_components/Graph/components/DragListShop.vue'
import DragListMine from '@/pages/_components/Graph/components/DragListMine.vue'
import { GraphEvent } from '@/constants/GraphEvent'
import DragListBoxToggle from '@/pages/_components/Graph/components/DragListBoxToggle.vue'
import CanCreate from '@/components/common/CanCreate.vue'
import DragItem from './DragItem.vue'

@Component({
  components: {
    CanCreate,
    DragListBoxToggle,
    DragListMine,
    DragListShop,
    DragItem,
  },
})
export default class DragListBox extends Vue {
  $refs!: {
    dragListShop: DragListShop
    dragListMine: DragListMine
  }

  showPanel = true
  activeName = 'first'

  // 事件冒泡
  toolEvent(eventName: string, ...args: any[]): void {
    this.$emit(GraphEvent.ToolEvent, eventName, ...args)
  }
  // 返回
  actionGoBack(): void {
    this.$confirm('是否确定返回上一页?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.$I18nRouter.back()
    })
  }
  // 跳转至新建
  actionToCreate(): void {
    // 需要把数据保存然后跳转
    this.toolEvent(GraphEvent.TriggerGraphSaveContent)
    this.$I18nRouter.push(`/application/pipe/new-local`)
  }
  // 跳转至运行
  actionToRun(): void {
    // 需要把数据保存然后跳转
    this.toolEvent(GraphEvent.TriggerGraphSaveContent)
    this.$I18nRouter.push(`/graph-info/set-run-local`)
  }
  // 临时保存
  actionToSave(): void {
    this.toolEvent(GraphEvent.TriggerGraphSaveContent)
    this.$notify({
      title: '',
      duration: 2000,
      customClass: 'el-notification-graph',
      message: '保存成功',
      offset: 40,
    })
  }

  mounted(): void {
    this.$refs.dragListShop.refreshTable()
    this.$refs.dragListMine.refreshTable()
  }
}
</script>

<style lang="scss">
.drag-list-box {
  position: relative;
  background: #3c3c3c;

  .left-panel {
    width: 248px;
  }
  .toggle-button {
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 1;
    cursor: pointer;
    top: 50%;
    margin-top: -86px;
    width: 16px;
    height: 172px;
    opacity: 0;
    left: 100%;
    transition: opacity 0.2s ease-in-out 0s;
    &.is-minimized {
      opacity: 1;
      pointer-events: auto;
      .svg-icon .path-arrow {
        transform-origin: center center;
        transform: rotate(180deg);
      }
    }
  }
  .item-padding {
    padding: 0.25rem 0.25rem 0.25rem 16px;
  }
  .list-item {
    white-space: nowrap;
    position: relative;
  }
  .el-icon-share {
    transform: rotateY(-180deg);
  }
  .fa-terminal {
    width: 14px;
    color: #a184dc;
  }
  .el-tree-node__expand-icon {
    position: absolute;
    left: 0;
    top: 0.25rem;
    margin-top: 2px;
  }
  .list-panel:hover .toggle-button:not(.is-minimized) {
    opacity: 1;
    pointer-events: auto;
  }
  .el-loading-mask {
    background-color: rgba(88, 88, 88, 0.9);
  }
}
</style>
