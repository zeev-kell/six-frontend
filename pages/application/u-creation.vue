<template>
  <el-container class="creation-box p-10">
    <el-aside width="240px">
      <div class="card mb-10">
        <div class="card-body el-row--flex el-row">
          <div class="el-col-auto">
            <el-avatar size="medium" src="/images/portrait.jpg"></el-avatar>
          </div>
          <div class="el-col-equal el-row--flex el-column--flex is-justify-center f-b p-l-1">
            <label>{{ username }}</label>
            <label class="text-truncate">{{ email }}</label>
          </div>
        </div>
      </div>
      <el-menu :default-active="$route.path" :router="true" class="border">
        <el-menu-item :index="localePath('application-u-creation')">
          <i class="el-icon-menu" />
          <span slot="title">创作中心</span>
        </el-menu-item>
        <el-menu-item :index="localePath('application-u-creation-app')">
          <i class="el-icon-menu" />
          <span slot="title">我的应用</span>
        </el-menu-item>
        <el-menu-item :index="localePath('application-u-creation-docs')">
          <i class="el-icon-setting" />
          <span slot="title">我的文档</span>
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
const UserNamespace = namespace('user')

@Component
export default class UCreation extends Vue {
  @UserNamespace.Action('ACTION_GET_INFO')
  ACTION_GET_INFO!: () => void
  @UserNamespace.Getter('username')
  username!: string
  @UserNamespace.Getter('email')
  email!: string
}
</script>
