<template>
  <div class="el-collapse-item">
    <div role="tab" aria-expanded="true" @click="collapsed = !collapsed">
      <div role="button" class="el-collapse-item__header text-uppercase title-b" :class="[!collapsed && 'is-active']">
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
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CollapseItem extends Vue {
  @Prop({
    default() {
      return ''
    },
  })
  title!: string
  collapsed = false
}
</script>
