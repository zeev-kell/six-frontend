<template>
  <div class="card no-border">
    <div class="card-header el-row--flex">
      <h3 class="card-title mt-10 el-col-full">授权管理</h3>
      <div class="action">
        <el-button type="primary" @click="dialogVisible = true">新增Token</el-button>
      </div>
    </div>
    <div class="card-body">
      <div class="text-muted mb-10">这是与您的帐户关联的 Token 列表，用于 sixbox 等客户端免密登录，删除所有您无法识别的 Token。</div>
      <div class="token-list el-row el-row--flex is-column">
        <div v-for="(t, index) of tableList" :key="index" class="el-row el-row--flex is-align-middle mt-10-a border p-20">
          <div class="el-col-auto p-20">
            <span class="el-icon-key f-36 text-success"></span>
          </div>
          <div class="el-col-full">
            <div>{{ t.description }}</div>
            <div class="m-y-05 pr-20">
              <small v-clipboard="t.token" class="text-break-all">{{ t.token }}</small>
            </div>
            <div>创建时间：{{ t.created_at }}</div>
          </div>
          <div class="el-col-auto">
            <loading-button type="danger" :callback="onDelete" :args="[t.resource_id]">删除</loading-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="新增Token" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item prop="description" label="描述">
          <el-input v-model="form.description" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <loading-button :callback="onSubmit" type="primary">确定</loading-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import clipboard from '@/directives/clipboard'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton },
  directives: {
    ...clipboard,
  },
  async asyncData({ app }): Promise<any> {
    const tableList = await app.$api.user.getTokenList()
    return { tableList }
  },
})
export default class AuthorizePage extends Vue {
  tableList: any[] = []
  dialogVisible = false
  form = {
    description: '',
  }

  onDelete($event: never, id: string): Promise<any> {
    return this.$confirm('此操作将删除该Token, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      return this.$api.user.removeToken(id).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        return this.onRefresh()
      })
    })
  }
  onSubmit(): Promise<any> {
    return this.$api.user.createToken(this.form).then(() => {
      this.form.description = ''
      this.dialogVisible = false
      return this.onRefresh()
    })
  }
  async onRefresh(): Promise<any> {
    this.tableList = await this.$api.user.getTokenList()
  }
}
</script>
