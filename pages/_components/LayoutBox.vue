<template>
  <div class="layout-box">
    <div v-if="$slots.header" class="layout-header">
      <slot name="header"></slot>
    </div>
    <div class="layout-main">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="layout-footer">
      <slot name="footer"></slot>
    </div>
    <div v-if="$slots.other" class="layout-other">
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LayoutBox extends Vue {}
</script>

<style lang="scss">
.layout-box {
  height: 100%;
  display: flex;
  flex: 1 1 100%;
  overflow-y: auto;
  flex-direction: column;
  background: #ffffff;
}

.layout-header,
.layout-footer {
  flex: 0 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}

.layout-main {
  display: flex;
  flex: 1 1 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;

  > .table,
  > .el-table {
    display: flex;
    flex: 1 1 100%;
    overflow-y: auto;
    flex-direction: column;

    &::before {
      background-color: transparent;
    }

    .el-table__body-wrapper {
      flex: 1 1 100%;
      overflow-y: auto;
    }

    .el-table__header-wrapper {
      flex: 0 0 auto;
    }
  }
}

.layout-header + .layout-main {
  padding-top: 0;
}
</style>
