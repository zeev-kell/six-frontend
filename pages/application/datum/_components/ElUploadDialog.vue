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
const a =
  'eyJjYWxsYmFja1VybCI6Imh0dHA6Ly8zOS4xMDEuMTgwLjM3OjUwMDAvYXBpL3YxL29zc2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5IjoiYnVja2V0PSR7YnVja2V0fSZvYmplY3Q9JHtvYmplY3R9JmV0YWc9JHtldGFnfSZzaXplPSR7c2l6ZX0mbWltZVR5cGU9JHttaW1lVHlwZX0mdXNlcj0ke3g6dXNlcn0mcmVzb3VyY2VpZD0ke3g6cmVzb3VyY2VpZH0mbmFtZT0ke3g6bmFtZX0mbWQ1PSR7eDptZDV9JmlkPSR7eDppZH0iLCJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIn0='
const b =
  'eyJ4OnVzZXIiOiIxMGE4ZDZjNS1lYzgwLTQzODktOGVhMy1lZjJhODJjYmU3YzkiLCJ4OnJlc291cmNlaWQiOiJjM2MwN2Y4Yi1kNWVkLTQ3Y2EtODMxYy02MmQxODI1MGE5ODkiLCJ4Om5hbWUiOiJURVNUIiwieDptZDUiOiJjYjNhMGY4NjA4ODQzMDkyMjBmMzk1OGZkMTNhM2VkMiIsIng6aWQiOiJkODBlMDk3Yi1jNWM5LTRjNDEtOTRmMy1lNjBhZGJlMTM2MmEifQ=='

function c(s: string) {
  console.log(Buffer.from(s, 'base64').toString())
}
c(a)
c(b)

@Component
export default class ElUploadDialog extends Vue {
  dialogVisible = true
  ossPath: string = ''
  region: string = ''
  bucket: string = ''
  callbackUrl: string = ''
  client: OSS | null = null
  token: any = null
  async uploadOssFile(option: uploadOption): Promise<void> {
    // TODO element File 不是通用 File
    if (!this.client) {
      await this.initClient()
    }
    const engineId = uuid4()
    const resourceId = this.$route.params.id
    const userId = this.$store.getters['user/username']
    const file = option.file
    const { size, name } = file
    const path = this.token.ossPath + engineId
    const hash = await getFileMd5(file)
    // TODO
    const mediatype = 'text/plain'
    const objectOption: OSS.PutObjectOptions = {
      callback: {
        url: this.token.callbackUrl,
        body: this.toUrlParams({
          /* eslint no-template-curly-in-string: [0] */
          bucket: '${bucket}',
          object: '${object}',
          etag: '${etag}',
          size: '${size}',
          mimeType: '${mimeType}',
          user: '${x:user}',
          resourceid: '${x:resourceid}',
          name: '${x:name}',
          md5: '${x:md5}',
          id: '${x:id}',
        }),
        contentType: 'application/x-www-form-urlencoded',
        customValue: {
          user: userId,
          resourceid: resourceId,
          name: this.$store.state.datum.name,
          md5: hash,
          id: engineId,
        },
      },
    }
    try {
      console.log(objectOption)
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
      region: this.token.region,
      // 填写Bucket名称。
      bucket: this.token.bucket,
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
  setToken(token: any): void {
    this.token = token
  }
  toUrlParams(obj: any): string {
    return Object.keys(obj)
      .map((k) => `${k}=${obj[k]}`)
      .join('&')
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
