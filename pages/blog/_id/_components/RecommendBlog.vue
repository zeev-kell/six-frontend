<template>
  <nuxt-link v-slot="{ navigate }" :to="localePath('/blog/' + blog.resource_id)" custom>
    <el-card shadow="hover" style="background: transparent">
      <div class="el-row el-row--flex pointer" @click="navigate">
        <div class="el-col el-col-6">
          <el-image :src="blog.image" fit="cover" style="height: 140px" @click="navigate">
            <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
          </el-image>
        </div>
        <div class="el-col el-col-18 pl-20">
          <h3 class="title">{{ blog.title }}</h3>
          <div class="description">{{ blog.description | intercept(100) }}</div>
        </div>
      </div>
    </el-card>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BlogModel } from '@/types/model/Blog'
import intercept from '@/filters/intercept'

@Component({
  filters: {
    ...intercept,
  },
})
export default class RecommendBlog extends Vue {
  @Prop({ required: true })
  blog!: BlogModel
}
</script>

<style scoped lang="scss">
.el-card {
  border: none;
  ::v-deep .el-card__body {
    padding: 0;
  }
}
</style>
