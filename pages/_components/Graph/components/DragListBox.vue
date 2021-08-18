<template>
  <div class="drag-list-box">
    <div class="tool-list"></div>
    <div class="list-panel">
      <div class="toggle-button" :class="{ 'is-minimized': !showPanel }" @click.prevent="showPanel = !showPanel">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon icon" viewBox="0 0 16 86" aria-hidden="true" width="16" height="86">
          <g fill="none" fill-rule="evenodd">
            <path class="path-wapper" d="M0 0l14.12 8.825A4 4 0 0116 12.217v61.566a4 4 0 01-1.88 3.392L0 86V0z" fill="#3c3c3c"></path>
            <path
              class="path-arrow"
              d="M10.758 48.766a.778.778 0 000-1.127L6.996 43l3.762-4.639a.778.778 0 000-1.127.85.85 0 00-1.172 0l-4.344 5.202a.78.78 0 000 1.128l4.344 5.202a.85.85 0 001.172 0z"
              fill="rgb(184, 188, 191)"
              fill-rule="nonzero"
            ></path>
          </g>
        </svg>
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
import DragItem from './DragItem.vue'

@Component({
  components: {
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
    right: -60px;
    top: 10px;
    z-index: 10;
    color: white;
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
