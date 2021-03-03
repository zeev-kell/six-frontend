<template>
  <div class="">
    <div v-if="children.length === 0 && !readonly">
      <div class="el-row text-center mb-1r">
        <div class="el-col-22 el-col-offset-1">
          <span v-if="title">{{ title }}</span>
          {{ description }}
          <div>No entries defined</div>
        </div>
      </div>
      <div v-if="!readonly" class="el-row text-center mb-1r">
        <el-button v-if="children.length === 0" type="text" size="mini" @click="onAdd"> Add an entry </el-button>
      </div>
    </div>
    <div v-for="(ctrl, index) of children" :key="index" class="el-row--flex text-center mb-05r is-align-middle">
      <input v-model="ctrl.key" class="form-control" placeholder="key" />
      <span class="add-on">:</span>
      <input v-model="ctrl.value" class="form-control" placeholder="value" />
      <el-tooltip v-if="!readonly" content="Delete">
        <el-button icon="el-icon-delete" type="text" @click="onRemove(index)"> </el-button>
      </el-tooltip>
    </div>
    <el-button v-if="children.length !== 0 && !readonly" type="text" size="mini" @click="onAdd">
      <i class="el-icon-plus"></i> Add an Entry
    </el-button>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'SelectionInputEntryMap',
    props: {
      value: {
        type: [Object, String],
        default: null,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        children: [{ key: 'k', value: 'v' }],
      }
    },
    methods: {
      onClick() {},
      onRemove(i) {
        this.children.splice(i, 1)
      },
      onAdd() {
        this.children.push({ key: 'k', value: 'v' })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  .add-on {
    flex: 0 0 20px;
  }
</style>
