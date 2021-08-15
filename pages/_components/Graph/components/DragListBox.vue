<template>
  <div class="drag-list-box">
    <div class="tool-list">
      <el-button type="dark" icon="el-icon-s-unfold" size="mini" @click.prevent="showPanel = !showPanel"></el-button>
    </div>
    <transition>
      <div v-if="showPanel" class="left-panel pt-5">
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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CollapseItem from '@/components/CollapseItem.vue'
import DragListShop from '@/pages/_components/Graph/components/DragListShop.vue'
import DragListMine from '@/pages/_components/Graph/components/DragListMine.vue'
import DragItem from './DragItem.vue'

@Component({
  components: {
    DragListMine,
    DragListShop,
    CollapseItem,
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
    height: calc(100vh - 56px);
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
}
</style>
