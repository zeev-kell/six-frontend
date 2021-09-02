<template>
  <div class="el-collapse-item">
    <div role="tab" aria-expanded="true" @click="collapsed = !collapsed">
      <div role="button" class="el-collapse-item__header text-uppercase" :class="[!collapsed && 'is-active']">
        {{ $t(title) }}
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

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CollapseItem extends Vue {
  @Prop({ default: '' })
  title!: string
  collapsed = false
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
