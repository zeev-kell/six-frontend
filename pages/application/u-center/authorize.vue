<template>
  <div class="card no-border">
    <div class="card-header el-row--flex">
      <h3 class="card-title mt-10 el-col-full">授权管理</h3>
      <div class="action">
        <el-button type="primary">新的Token</el-button>
      </div>
    </div>
    <div class="card-body">
      <div class="text-muted mb-10">这是与您的帐户关联的 Token 列表，用户 sixbox 等客户端免密登录，删除所有您无法识别的 Token。</div>
      <div class="token-list el-row el-row--flex el-column--flex">
        <div v-for="(t, index) of tableList" :key="index" class="el-row el-row--flex is-align-middle mt-10-a border p-10">
          <div class="el-col-auto p-20">
            <span class="el-icon-key f-36 text-success"></span>
          </div>
          <div class="el-col-full">
            <div>用于电脑登录</div>
            <div class="m-y-05">
              <span v-clipboard="t.value">{{ t.value }}</span>
            </div>
            <div>创建时间：6天前</div>
          </div>
          <div class="el-col-auto">
            <el-button type="danger">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import clipboard from '@/directives/clipboard'

@Component({
  directives: {
    ...clipboard,
  },
})
export default class Authorize extends Vue {
  tableList = [
    {
      name: 'name',
      value: 'fLJeISyhxn7aeNDQ3SO8wf7i9OJOramwGhMfLJeISyhxn7aeNDQ3SO8wf7i9OJOramwGhM',
    },
    {
      name: 'name',
      value: 'fLJeISyhxn7aeNDQ3SO8wf7i9OJOramwGhMfLJeISyhxn7aeNDQ3SO8wf7i9OJOramwGhM',
    },
  ]

  onCopy(e): void {
    alert('You just copied: ' + e.text)
  }
}
</script>
