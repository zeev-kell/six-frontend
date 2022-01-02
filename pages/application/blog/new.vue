<template>
  <div class="container-fluid p-20">
    <div class="card" style="padding-bottom: 20px">
      <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
        <div class="card-header">
          <el-form-item prop="title" label-width="0" class="form-title">
            <el-input v-model="formModel.title" placeholder="请输入标题（最多100个字）"></el-input>
          </el-form-item>
        </div>
        <div class="card-body">
          <mavon-editor-client
            ref="md"
            v-model="formModel.content"
            placeholder="请输入正文"
            @fullScreen="onFullScreen"
            @imgAdd="addImage"
            @imgDel="removeImage"
          ></mavon-editor-client>
        </div>
        <div id="publicSetting" class="card-body">
          <el-form-item label="添加封面" prop="image" :loading="loading">
            <el-upload action="" class="image-cover" :http-request="httpRequest" :show-file-list="false" :before-upload="beforeUpload">
              <img v-if="formModel.image" :src="formModel.image" class="avatar" alt="" />
              <i v-else class="el-icon-plus uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">图片上传格式支持 JPEG、JPG、PNG</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <blog-type-select v-model="formModel.type" placeholder="请选择类别" />
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <category-select v-model="formModel.category" multiple type="blog" allow-create placeholder="请输入分类" class="w-100" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入描述" />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div v-show="!fullScreen" class="actions el-row">
      <div class="el-col-equal">
        <transition name="el-zoom-in-top">
          <el-button v-if="isSetting" type="text" @click.stop="scrollTo()">回到顶部 <i class="el-icon-arrow-up"></i></el-button>
          <el-button v-else type="text" @click.stop="scrollTo(400)">发布设置 <i class="el-icon-arrow-down"></i></el-button>
        </transition>
      </div>
      <div class="el-col-equal text-right">
        <span class="mr-10 text-muted">字数：{{ formModel.content.length }} 字</span>
        <!--        <nuxt-link v-slot="{ href }" :to="localePath('doc-preview')" custom>-->
        <!--          <a class="el-button el-button&#45;&#45;info el-button&#45;&#45;medium" target="_blank" :href="href">预览</a>-->
        <!--        </nuxt-link>-->
        <loading-button type="success" icon="el-icon-plus" :callback="onSubmit"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'
import { blogConstants } from '@/constants/BlogConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'
import OssUploadMixin from '@/pages/application/datum/_components/OssUploadMixin.vue'
import { uploadChunkOption } from '@/types/ElUpload'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import BlogTypeSelect from '@/pages/application/_components/BlogTypeSelect.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'

const cubic = (value: number) => Math.pow(value, 3)
const easeInOutCubic = (value: number) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2)

@Component({
  components: {
    CategorySelect,
    BlogTypeSelect,
    MavonEditorClient,
    LoadingButton,
  },
})
export default class DocNewPage extends OssUploadMixin {
  $refs!: {
    formModel: HTMLFormElement
    md: MavonEditorClient
  }

  formModel: any = {
    title: '',
    type: undefined,
    category: [],
    content: '',
    image: '',
    description: '',
  }
  rules = {
    title: [{ required: true, trigger: 'change' }],
    type: [{ required: true, message: '请输入类别', trigger: 'blue' }],
    category: [{ required: true, message: '请输入分类', trigger: 'blue' }],
  }
  fullScreen = false
  loading = false
  isSetting = false
  el!: HTMLElement
  publicSettingHead = 700

  async onSubmit(): Promise<void> {
    await this.$refs.formModel.validate().catch((e: Error) => {
      this.$message.warning('请填写完整信息')
      throw e
    })
    await this.$api.blog.create(this.formModel).then(() => {
      this.$I18nRouter.push('/application/blogs')
    })
  }
  onFullScreen(fullScreen: boolean): void {
    this.fullScreen = fullScreen
  }
  beforeUpload(file: File): boolean {
    const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
    const isLt2M = file.size / 1024 / 1024 < 0.5
    if (!isJPG) {
      this.$message.error('上传封面只能是 JPEG、JPG、PNG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传图片大小不能超过 500kB!')
    }
    return isJPG && isLt2M
  }
  async httpRequest(option: uploadChunkOption): Promise<any> {
    const file = option.file
    const uFile = new UFile(file)
    this.loading = true
    await this.uploadOssFile(uFile, false)
      .catch((e) => {
        uFile.uploadError(e)
        option.onError(e.message || e)
      })
      .finally(() => {
        this.loading = false
      })
    option.onSuccess(uFile)
    this.formModel.image = uFile.ossPath
  }
  async addImage(filename: string, file: File): Promise<void> {
    const uFile = new UFile(file)
    await this.uploadOssFile(uFile, false).catch((e) => {
      uFile.uploadError(e)
    })
    this.$refs.md.$img2Url(filename, uFile.ossPath)
  }
  removeImage(filename: string): void {
    console.log('on img delete:', filename)
  }
  onWindowScroll(): void {
    this.isSetting = this.el.scrollTop + this.publicSettingHead > this.el.scrollHeight
  }
  scrollTo(negative = 0): void {
    const el = this.el
    const scrollHeight = el.scrollHeight
    const start = el.scrollTop
    const end = negative ? scrollHeight - negative : 0
    const beginTime = Date.now()
    const beginValue = end - start
    const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16))
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500
      if (progress < 1) {
        el.scrollTop = end - beginValue * (1 - easeInOutCubic(progress))
        rAF(frameFunc)
      } else {
        el.scrollTop = end
      }
    }
    rAF(frameFunc)
  }

  mounted(): void {
    this.el = document.querySelector('.el-main') as HTMLElement
    this.el.addEventListener('scroll', this.onWindowScroll)
  }
  beforeDestroy(): void {
    this.el.removeEventListener('scroll', this.onWindowScroll)
  }
}
</script>

<style scoped lang="scss">
.form-title {
  margin-bottom: 0;
  ::v-deep {
    .el-input__inner {
      border-width: 0;
      font-size: 2em;
      padding: 10px;
      height: 56px;
      font-weight: bold;
    }
    .el-form-item__error {
      display: none !important;
    }
  }
  &.is-error ::v-deep {
    .el-input__inner {
      border-width: 1px;
    }
  }
}
.actions {
  padding: 10px 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1501;
  margin: 0;
  min-width: 0;
  display: flex;
  left: 0;
  right: 0;
  border-top: 1px solid #ebebeb;
  background: #ffffff;
  -webkit-font-smoothing: subpixel-antialiased;
}
.image-cover {
  ::v-deep > .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height: 150px;
    min-width: 150px;
    display: block;
  }
}
.el-upload__tip {
  margin-top: 0;
}
</style>
