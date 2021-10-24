<template>
  <div class="container-fluid p-20">
    <div class="el-row--flex is-justify-space-between pb-10">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" :model="query" @submit.native.prevent="">
          <el-form-item>
            <el-autocomplete v-model="query.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
              <template slot-scope="{ item }">
                <div class="name">
                  {{ item.value }}
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true"> 新增 </el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableDate" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="文件名称" prop="name" sortable width="280"></el-table-column>
        <el-table-column label="媒介类型" prop="format" sortable width="120"></el-table-column>
        <el-table-column label="大小" prop="category" sortable width="120" />
        <el-table-column label="MD5校验码" prop="version" width="120" />
        <el-table-column label="格式规范" prop="version" width="120" />
        <el-table-column label="说明" prop="description">
          <template slot-scope="{ row }">{{ row.description | intercept }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button>下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'
import OSS from 'ali-oss'
import intercept from '@/filters/intercept'
interface uploadChunkOption {
  headers: any
  withCredentials: boolean
  file: File
  data: any
  filename: string
  action: string
  onProgress: (e: ProgressEvent) => void
  onSuccess: (res: any) => void
  onError: (e: any) => void
  _id: string
  _chunks: number
  _currentChunk: number
}

@Component({
  asyncData({ store }) {
    const items = store.getters['datum/items']
    return { items }
  },
  filters: {
    ...intercept,
  },
})
export default class DatumEditManage extends BaseTable {
  dialogVisible = false
  ossPath: string = 'exampledir/'
  async uploadOssFile(option: uploadChunkOption): Promise<void> {
    console.log(option)
    const token = await this.$api.datum.getOssToken()
    const client = new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: token.Region || 'oss-cn-zhangjiakou',
      // 填写Bucket名称。
      bucket: token.Bucket || 'sixoclock',
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId: token.access_key_id,
      accessKeySecret: token.access_key_secret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: token.security_token,
      refreshSTSToken: async () => {
        // 向您搭建的STS服务获取临时访问凭证。
        const token = await this.$api.datum.getOssToken()
        return {
          accessKeyId: token.access_key_id,
          accessKeySecret: token.access_key_secret,
          stsToken: token.security_token,
        }
      },
      // 刷新临时访问凭证的时间间隔，单位为毫秒。
      refreshSTSTokenInterval: 300000,
    })
    const storeAs = this.ossPath + option.file.name
    try {
      const result = await client.put(storeAs, option.file)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
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
