<template>
  <el-dialog :title="temp.tool_name" :visible.sync="dialogVisible" center width="75%">
    <div class="dialog-body">
      <el-row>
        <el-col :span="12">
          <div class="panel-body">
            <div class="panel-title">功能描述：</div>
            {{ temp.description }}
          </div>
          <div class="panel-body">
            <div class="panel-title">输入文件：</div>
            <ol>
              <li>参考基因fasta文件</li>
              <li>测序fastq文件</li>
            </ol>
          </div>
          <div class="panel-body">
            <div class="panel-title">输出文件：</div>
            <ol>
              <li>Sam文件</li>
              <li>Bam文件</li>
            </ol>
          </div>
          <div class="panel-body">
            <div class="panel-title">帮助文档：</div>
            {{ temp.tutorial }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="panel-body">
            <div class="panel-title">参数设置：</div>
            <el-select v-model="tempSub" placeholder="子功能选择" size="small" @change="changeSub">
              <el-option v-for="item in tempSubs" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <p class="mb-0">{{ tempSubObj.description }}</p>
          </div>
          <el-form ref="form" :model="tempSubObj.params" class="panel-body" size="small" label-position="top">
            <pipe-param-input v-for="(param, key) of tempSubObj.params" :key="key" :param="param"></pipe-param-input>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/babel">
  import PipeParamInput from '@/components/pages/pipe/PipeParamInput'
  export default {
    name: 'PipeInfoDialog',
    components: { PipeParamInput },
    data() {
      return {
        dialogVisible: false,
        temp: {},
        tempSub: undefined,
        tempSubObj: {},
      }
    },
    computed: {
      tempSubs() {
        return Object.keys(this.temp?.settings || {}) || []
      },
    },
    methods: {
      show(temp) {
        this.temp = temp
        this.tempSub = undefined
        this.tempSubObj = {}
        this.dialogVisible = true
      },
      changeSub(value) {
        this.tempSubObj = this.temp.settings[value]
      },
      onConfirm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const h = this.$createElement

            this.$notify({
              title: '提交成功',
              message: h('div', { style: 'color: teal' }, JSON.stringify(this.tempSubObj)),
              duration: 0,
            })
          } else {
            // eslint-disable-next-line no-console
            alert('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>
