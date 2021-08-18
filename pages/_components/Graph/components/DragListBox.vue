<template>
  <div class="drag-list-box">
    <div class="tool-list">
      <el-button type="primary" icon="el-icon-plus" size="mini" title="新建" @click="actionToCreate"></el-button>
      <el-button type="success" icon="el-icon-video-play" size="mini" title="设置运行参数" @click="actionToRun"></el-button>
    </div>
    <div class="list-panel">
      <div class="toggle-button" :class="{ 'is-minimized': !showPanel }" @click.prevent="showPanel = !showPanel">
        <drag-list-box-toggle></drag-list-box-toggle>
      </div>
      <transition>
        <div v-show="showPanel" class="left-panel pt-5">
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
import DragItem from './DragItem.vue'

@Component({
  components: {
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
  // 跳转至新建
  actionToCreate(): void {
    // 需要把数据保存然后跳转
    this.toolEvent(GraphEvent.TriggerSaveContent)
    this.$I18nRouter.push(`/application/pipe/new-local`)
  }
  // 跳转至运行
  actionToRun(): void {
    // 需要把数据保存然后跳转
    this.toolEvent(GraphEvent.TriggerSaveContent)
    this.$I18nRouter.push(`/graph-info/set-run-local`)
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

  .left-panel {
    width: 248px;
  }
  .tool-list {
    position: absolute;
    left: 100%;
    top: 10px;
    z-index: 10;
    color: white;
    display: flex;
    margin-left: 30px;
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
  .el-button--mini {
    width: 30px;
    height: 30px;
    padding: 0;
  }
  .el-tabs__nav-wrap::after {
    background-color: #222;
    height: 1px;
  }
  .el-tabs__active-bar {
    height: 1px;
  }
  .el-tabs__content {
    height: calc(100vh - 60px);
  }
  .el-tabs__nav {
    width: 100%;
    color: #ffffff;
    border-radius: 0 !important;
  }
  .el-tabs__item {
    color: #999999;
    width: 50%;
    text-align: center;
    padding: 0;
    &.is-active {
      color: #ffffff;
      border-bottom-color: #3c3c3c !important;
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
}
</style>
