<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BlogNewPage from '@/pages/application/blog/new.vue'

@Component({
  async asyncData({ app, params }) {
    const item: any = await app.$api.blog.get(params.id)
    item.category = item.category.map((c: any) => c.name)
    return { formModel: item }
  },
})
export default class BlogEditPage extends BlogNewPage {
  async onSubmit() {
    await this.$refs.formModel.validate().catch((e: Error) => {
      this.$message.warning('请填写完整信息')
      throw e
    })
    await this.$api.blog.update(this.formModel.id, this.formModel).then(() => {
      this.$I18nRouter.push('/application/blogs')
    })
  }
}
</script>
