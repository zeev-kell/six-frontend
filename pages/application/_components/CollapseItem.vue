<template>
  <div class="el-collapse-item">
    <div role="tab" aria-expanded="true" @click="collapsed = !collapsed">
      <div role="button" class="el-collapse-item__header text-uppercase" :class="[!collapsed && 'is-active']">
        {{ title }}
        <i class="el-collapse-item__arrow el-icon-arrow-right" :class="[!collapsed && 'is-active']"></i>
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="!collapsed" role="tabpanel" class="el-collapse-item__wrap">
        <div class="el-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'CollapseItem',
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        collapsed: false,
      }
    },
  }
</script>

<style scoped lang="scss">
  .el-collapse-item__header {
    color: white;
    background-color: transparent;
    border: none;
  }
  .el-collapse-item__wrap {
    background-color: transparent;
    border-bottom: none;
  }
  .el-collapse-item__content {
    color: inherit;
    padding-bottom: 0;
  }
</style>
