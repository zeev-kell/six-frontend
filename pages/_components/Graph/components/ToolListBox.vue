<template>
  <div class="tool-list-box">
    <div class="tool-list">
      <el-button type="dark" icon="el-icon-s-unfold" size="mini" @click.prevent="onShowPanel"></el-button>
    </div>
    <transition>
      <div v-if="showPanel" class="left-panel pt-5">
        <el-tabs v-model="activeName">
          <el-tab-pane label="应用商店" name="first">
            <div class="task-search">
              <el-form @submit.native.prevent>
                <el-form-item>
                  <el-input v-model="listQuery.name" :placeholder="$t('placeholder.search')" clearable @keyup.enter.native="searchQuery"> </el-input>
                </el-form-item>
              </el-form>
            </div>
            <ul class="list-unstyled">
              <drag-item v-for="item of tableData" :key="item.id" :item="item" class="list-item">
                <i v-if="item.type === 0" class="el-icon-share text-warning"></i>
                <i v-else class="el-icon-document text-primary"></i>
                <span class="item-name">{{ item.name }}</span>
              </drag-item>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="我的应用" name="second">
            <div class="task-search">
              <el-form @submit.native.prevent>
                <el-form-item>
                  <el-input v-model="listQuery.name" :placeholder="$t('placeholder.search')" clearable @keyup.enter.native="searchQuery"> </el-input>
                </el-form-item>
              </el-form>
            </div>
            <ul class="list-unstyled">
              <drag-item v-for="item of tableData" :key="item.id" :item="item">
                {{ item.name }}
              </drag-item>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import TableMixins from '@/components/TableMixins'
import { tableQuery } from '@/types/table'
import { taskConstants } from '@/constants/TaskConstants'
import CollapseItem from '@/components/CollapseItem.vue'
import cwl from '@/plugins/mock/cwl.json'
import DragItem from './DragItem.vue'

@Component({
  components: {
    CollapseItem,
    DragItem,
  },
})
export default class TaskBox extends TableMixins<any> {
  protected listQuery: tableQuery = {
    page: 1,
    size: 20,
    name: undefined,
    status: taskConstants.items.STATUS_ON,
  }
  showPanel = true
  isShowed = false
  tableData: any[] = []
  activeName = 'first'

  onShowPanel(): void {
    if (this.showPanel) {
      this.showPanel = false
      return
    }
    if (!this.isShowed) {
      this.isShowed = true
      this.searchQuery()
    }
    this.showPanel = true
  }

  async getTableData(listQuery: tableQuery): Promise<void> {
    let response = await this.$api.pipe.getListV2()
    response = response.filter((r: any) => r.type === 0 || r.type === 1)
    response.forEach((r: any) => {
      r.content = cwl
    })
    this.tableData = response
  }

  async created(): Promise<void> {}
}
</script>

<style lang="scss">
.tool-list-box {
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
  .list-item {
    padding: 0.25rem 0.25rem 0.25rem 1rem;
    white-space: nowrap;
  }
}
</style>
