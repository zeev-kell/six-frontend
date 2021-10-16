<template>
  <el-container class="personal-box p-10">
    <el-aside width="240px">
      <div class="card mb-10">
        <div class="card-body el-row--flex el-row">
          <div class="el-col-equal el-row--flex el-column--flex is-justify-center f-b p-l-1">
            <label>{{ username }}</label>
            <label class="text-truncate">{{ email }}</label>
          </div>
        </div>
      </div>
      <el-menu :default-active="$route.path" :router="true" class="border">
        <el-menu-item :index="localePath('application-u-center')">
          <i class="el-icon-menu" />
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item :index="localePath('application-u-center-account')">
          <i class="el-icon-menu" />
          <span slot="title">帐号密码</span>
        </el-menu-item>
        <el-menu-item :index="localePath('application-u-center-authorize')">
          <i class="el-icon-setting" />
          <span slot="title">授权管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="p-0 ml-10">
      <nuxt-child />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
const UserNamespace = namespace('user')

@Component({
  async middleware({ store }) {
    // TODO 修改为只有首次加载
    await store.dispatch('user/ACTION_GET_INFO')
  },
  computed: {
    ...mapState('user', ['username', 'email']),
  },
})
export default class UCenterPage extends Vue {
  @UserNamespace.Action('ACTION_GET_INFO')
  ACTION_GET_INFO!: () => void
}
</script>
