<template>
  <span class="category-view">
    <span v-for="c of category" :key="c.id">{{ c.name }}</span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { CategoryModel } from '@/types/model/Common'

@Component
export default class CategoryView extends Vue {
  @Prop({
    required: true,
    default() {
      return []
    },
  })
  category!: CategoryModel[]
}
</script>

<style lang="scss">
.category-view {
  span + span {
    margin-left: 5px;
  }
}
</style>
