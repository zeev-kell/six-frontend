<template>
  <div class="container-fluid">
    <div class="px-15 text-muted">运行案例为一个使用该应用进行计算的示例。</div>
    <div class="card-body">
      <div class="el-row el-row--flex">
        <div class="el-col-full">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-case-new')" custom>
            <el-button type="primary" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <span class="m-x-1">或</span>
          <case-select v-model="caseId" />
        </div>
        <div class="el-col-auto">
          <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import CaseSelect from '@/pages/application/_components/CaseSelect.vue'

@Component({
  components: { CaseSelect, LoadingButton },
})
export default class Case extends PipeItemMixin {
  profile = {}
  caseId = ''
  async onSubmit(): Promise<void> {
    const data = { profile: this.caseId }
    await this.$api.pipe.updateRevision(this.item.pipe_id, this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', data)
    })
  }
  mounted(): void {
    this.caseId = this.item.profile
  }
}
</script>
