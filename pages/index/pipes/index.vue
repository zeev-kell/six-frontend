<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="search-box">
        <el-form :inline="true" :model="params">
          <el-form-item>
            <el-autocomplete v-model="params.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="params.category" placeholder="按类型筛选" clearable>
              <el-option v-for="item in categoryList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="params.type" placeholder="按类别筛选">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
        <el-table :data="tableDate" style="width: 100%">
          <el-table-column label="软件名称" prop="tool_name" sortable width="120"></el-table-column>
          <el-table-column label="分类" prop="category" sortable width="120"></el-table-column>
          <el-table-column label="最近版本" prop="version" width="120"></el-table-column>
          <el-table-column label="软件配置" prop="configuration" width="120">
            <template slot-scope="{ row }">
              <el-button type="normal" size="small" @click="showConfig(row)">
                配置<i class="iconfont icon-ellipsis-vertical"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="软件介绍" prop="description"></el-table-column>
        </el-table>
      </div>
      <div class="dialog-box">
        <el-dialog :title="temp.tool_name" :visible.sync="dialogFormVisible" center modal-append-to-body>
          <div class="dialog-body">
            <el-row>
              <el-col :span="12">
                <div class="panel no-border">
                  <div><strong>功能描述：</strong></div>
                  {{ temp.description }}
                </div>
                <div class="panel no-border">
                  <div><strong>输入文件：</strong></div>
                  <ol>
                    <li>参考基因fasta文件</li>
                    <li>测序fastq文件</li>
                  </ol>
                </div>
                <div class="panel no-border">
                  <div><strong>输出文件：</strong></div>
                  <ol>
                    <li>Sam文件</li>
                    <li>Bam文件</li>
                  </ol>
                </div>
                <div class="panel no-border">
                  <div><strong>帮助文档：</strong></div>
                  {{ temp.tutorial }}
                </div>
              </el-col>
              <el-col :span="12">
                <div class="panel no-border">
                  <div><strong>参数设置：</strong></div>
                  <el-select v-model="tempSub" placeholder="请选择">
                    <el-option v-for="item in tempSubs" :key="item" :label="item" :value="item"> </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    async asyncData({ app }) {
      const items = await app.$axios.$get('/pipes')
      return { items }
    },
    data() {
      return {
        params: {
          name: '',
          type: '',
          category: '',
        },
        items: [],
        temp: {},
        tempSub: undefined,
        tempSubs: [],
        dialogFormVisible: false,
      }
    },
    computed: {
      categoryList() {
        return this.items.reduce((list, item) => {
          if (!list.includes(item.category)) {
            list.push(item.category)
          }
          return list
        }, [])
      },
      nameList() {
        return this.items.reduce((list, item) => {
          if (!list.includes(item.tool_name)) {
            list.push({ value: item.tool_name })
          }
          return list
        }, [])
      },
      tableDate() {
        let data = this.items
        if (this.params.category) {
          data = data.filter((item) => {
            return item.category === this.params.category
          })
        }
        if (this.params.name) {
          data = data.filter((item) => {
            return item.tool_name.includes(this.params.name)
          })
        }
        return data
      },
    },
    methods: {
      createFilter(str) {
        return (name) => {
          return name.value.toLowerCase().includes(str.toLowerCase())
        }
      },
      queryName(str, cb) {
        const nameList = this.nameList
        const results = str ? nameList.filter(this.createFilter(str)) : nameList
        cb(results)
      },
      showConfig(temp) {
        this.temp = Object.assign({}, temp)
        this.tempSub = Object.keys(this.temp?.settings || {})
        this.dialogFormVisible = true
      },
    },
  }
</script>
