<template>
  <el-dialog title="上传数据" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false">
    <el-upload action="/api" multiple :limit="3" class="upload-wrap" :http-request="uploadOssFile">
      <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
      <span class="mx-5">或</span>
      <el-input placeholder="链接" style="width: 300px">
        <el-button slot="append" icon="el-icon-check"></el-button>
      </el-input>
      <div slot="tip" class="el-upload__tip">只能上传不超过2M的文件</div>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import OSS from 'ali-oss'
import { uuid4 } from '@/utils/uuid'
import { uploadOption } from '@/pages/application/datum/_components/uploadOption'
import { getFileMd5 } from '@/utils/file-md5'

@Component
export default class ElUploadDialog extends Vue {
  dialogVisible = true
  ossPath: string = ''
  region: string = ''
  bucket: string = ''
  callbackUrl: string = ''
  client: OSS | null = null
  async uploadOssFile(option: uploadOption): Promise<void> {
    // TODO element File 不是通用 File
    if (!this.client) {
      await this.initClient()
    }
    const engineId = uuid4()
    const file = option.file
    const { size, name } = file
    const path = this.ossPath + engineId
    const hash = await getFileMd5(file)
    // TODO
    const mediatype = 'text/plain'
    const objectOption = {
      callback: {
        url: this.callbackUrl,
        body: `bucket=${this.bucket}&object=${encodeURIComponent(path)}&etag=${hash}&size=${size}&mimeType=${mediatype}`,
      },
    }
    try {
      console.log(option)
      const result = await this.client!.put(path, file, objectOption)
      console.log(result)
      await this.$api.datum.addFile(this.$route.params.id, {
        id: engineId,
        oss_tag: 1,
        content: {
          name,
          path,
          hash,
          bytes: size,
          mediatype,
          description: 'description',
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  async initClient(): Promise<void> {
    const token = await this.$api.datum.getOssToken()
    this.setToken(token)
    this.client = new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: this.region,
      // 填写Bucket名称。
      bucket: this.bucket,
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId: token.access_key_id,
      accessKeySecret: token.access_key_secret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: token.security_token,
      refreshSTSToken: async () => {
        // 向您搭建的STS服务获取临时访问凭证。
        const token = await this.$api.datum.getOssToken()
        this.setToken(token)
        return {
          accessKeyId: token.access_key_id,
          accessKeySecret: token.access_key_secret,
          stsToken: token.security_token,
        }
      },
      // 刷新临时访问凭证的时间间隔，单位为毫秒。
      refreshSTSTokenInterval: 300000,
    })
  }
  setToken(token): void {
    this.region = token.region
    this.bucket = token.bucket
    this.ossPath = token.ossPath
    this.callbackUrl = token.callbackUrl
  }
}
</script>

<style lang="scss">
.upload-wrap {
  text-align: center;
  padding-bottom: 30px;
  .el-upload-list {
    text-align: left;
  }
}
</style>
