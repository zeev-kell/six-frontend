<template>
  <div class="container-fluid p-20">
    <div class="el-row--flex is-justify-space-between pb-10">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" size="small" :model="query" @submit.native.prevent="">
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
        <loading-button type="info" size="small" icon="el-icon-download" :callback="onBatchDownload" :disabled="!hasSelected">下载</loading-button>
      </div>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column label="文件名称" prop="name" sortable width="250">
          <template slot-scope="{ row }">
            <span :class="['mr-2 ', isOssObject(row) ? 'el-icon-document' : 'el-icon-link']"></span>{{ row.name }}
          </template>
        </el-table-column>
        <el-table-column label="媒介类型" prop="mediatype" sortable width="120"></el-table-column>
        <el-table-column label="大小" prop="bytes" sortable width="80">
          <template slot-scope="{ row }">
            <div>{{ row.bytes | formatbytes }}</div>
          </template>
        </el-table-column>
        <el-table-column label="MD5校验码" prop="hash" width="230">
          <template slot-scope="{ row }">
            <div v-clipboard="row.hash" class="text-truncate">{{ row.hash }}</div>
          </template>
        </el-table-column>
        <el-table-column label="格式规范" width="120">
          <template slot-scope="{ row }">
            <schema-name :schema="row.schema"></schema-name>
          </template>
        </el-table-column>
        <el-table-column label="说明" prop="description">
          <template slot-scope="{ row }">{{ row.description | intercept }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <loading-button
              type="icon el-button--info"
              size="mini"
              :callback="onDownload"
              :args="[row]"
              icon="el-icon-download"
              title="下载"
            ></loading-button>
            <loading-button type="icon" size="mini" :callback="onGetDownloadUrl" :args="[row]" icon="el-icon-link" title="获取链接"></loading-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'
import intercept from '@/filters/intercept'
import formatbytes from '@/filters/formatbytes'
import clipboard, { copyText } from '@/directives/clipboard'
import OSS from 'ali-oss'
import LoadingButton from '@/components/LoadingButton.vue'
import SchemaName from '@/pages/application/datum/_components/SchemaName.vue'
import { DatumItemModel } from '@/types/model/Datum'

@Component({
  components: { SchemaName, LoadingButton },
  directives: {
    ...clipboard,
  },
  asyncData({ store }) {
    const items: DatumItemModel[] = store.getters['datum/items']
    return { items }
  },
  filters: {
    ...intercept,
    ...formatbytes,
  },
})
export default class DatumFile extends BaseTable {
  typeList = []
  get nameList() {
    return []
  }

  isOssObject(row: any): boolean {
    return row.saveMode === 'ossObject'
  }
  async getUrl(row: DatumItemModel) {
    const resourceId = this.$store.state.datum.resource_id
    const { stsToken, content } = await this.$api.datum.getFile(resourceId, row.id)
    const region = stsToken.Region?.split('.')[0] || 'oss-cn-zhangjiakou'
    const client = new OSS({
      secure: true, // https
      region,
      accessKeyId: stsToken.access_key_id,
      accessKeySecret: stsToken.access_key_secret,
      stsToken: stsToken.security_token,
      bucket: stsToken.Bucket || 'sixoclock',
    })
    const url = client.signatureUrl(content.path.replace(/^six:\/\//, ''), {
      response: {
        'content-disposition': `attachment; filename=${encodeURIComponent(content.name)}`,
      },
    })
    return url.replace(/^https:\/\/.*?\//, 'https://bucket.sixoclock.net/')
  }
  async onDownload(row: DatumItemModel): Promise<any> {
    try {
      const url = this.isOssObject(row) ? await this.getUrl(row) : row.path
      window.open(url, '_blank')
    } catch (e) {
      this.$message.error(`下载 ${row.name} 失败`)
    }
  }
  async onGetDownloadUrl(row: DatumItemModel) {
    const url = this.isOssObject(row) ? await this.getUrl(row) : row.path
    const h = this.$createElement
    return this.$msgbox({
      title: '获取下载链接',
      message: h('div', undefined, [
        h(
          'div',
          {
            attrs: {
              title: url,
            },
            style: {
              overflow: 'hidden',
              'word-break': 'break-all',
              'margin-bottom': '10px',
              cursor: 'pointer',
            },
            on: {
              click: (): void => {
                copyText(url, (this.$refs as any).msgBox).then(() => {
                  this.$message.success('复制成功')
                })
              },
            },
            ref: 'msgBox',
          },
          url
        ),
        this.isOssObject(row) ? h('p', undefined, [h('span', { class: 'text-warning' }, '30分钟'), '内有效。']) : '',
      ]),
    })
  }
  async onBatchDownload(): Promise<any> {
    await this.$confirm(`即将下载${this.multipleSelection.length}个文件`).then(async () => {
      for (const row of this.multipleSelection) {
        await this.onDownload(row)
      }
      this.$refs.multipleTable.clearSelection()
    })
  }
}
</script>
