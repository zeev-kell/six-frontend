<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OSS from 'ali-oss'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import { DatumItemModel } from '@/types/model/Datum'

function toUrlParams(obj: any): string {
  return (
    '{' +
    Object.keys(obj)
      .map((k) => `"${k}":${obj[k]}`)
      .join(',') +
    '}'
  )
}

@Component
export default class OssUploadMixin extends Vue {
  protected client: OSS | null = null
  protected token: any = null
  protected initClientPromise: null | Promise<any> = null
  protected refreshSTSTokenPromise: null | Promise<any> = null
  protected createCallback(customValue: any) {
    return {
      url: this.token.callbackUrl,
      contentType: 'application/json',
      body: toUrlParams({
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
      customValue,
    }
  }
  protected refreshSTSToken(): Promise<any> {
    if (this.refreshSTSTokenPromise === null) {
      this.refreshSTSTokenPromise = this.$api.datum.getOssToken().then((data) => {
        this.refreshSTSTokenPromise = null
        return data
      })
    }
    return this.refreshSTSTokenPromise
  }
  protected initClient(): Promise<void> {
    if (this.initClientPromise === null) {
      this.initClientPromise = this.refreshSTSToken().then((token: any) => {
        this.token = token
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
            const token = await this.refreshSTSToken()
            this.token = token
            return {
              accessKeyId: token.access_key_id,
              accessKeySecret: token.access_key_secret,
              stsToken: token.security_token,
            }
          },
          // 刷新临时访问凭证的时间间隔，单位为毫秒。
          refreshSTSTokenInterval: 300000,
        })
        this.initClientPromise = null
      })
    }
    return this.initClientPromise
  }
  protected async uploadOssFile(uFile: UFile): Promise<void> {
    // 上传 OSS 文件
    if (!this.client) {
      await this.initClient()
    }
    uFile.path = this.token.ossPath + uFile.id
    const { id, name, hash, file, path } = uFile
    const userId = this.$store.getters['user/username']
    const objectOption: OSS.PutObjectOptions = {
      callback: this.createCallback({
        user: userId,
        resourceid: uFile.resourceId,
        name,
        md5: hash,
        id,
      }),
    }
    // 关于进度条，只有分片上传才有
    uFile.progress = 0
    await this.client!.put(path, file, objectOption)
    uFile.progress = 1
  }
  protected async addFileToDatum(uFile: UFile) {
    const { id, bytes, name, mediaType, hash, path, description, resourceId, schema } = uFile
    await this.$api.datum.addFile(resourceId, {
      id,
      oss_tag: uFile.file ? 1 : 0,
      content: {
        name,
        path,
        hash,
        bytes,
        schema,
        mediatype: mediaType,
        description,
      } as DatumItemModel,
    })
  }
}
</script>
