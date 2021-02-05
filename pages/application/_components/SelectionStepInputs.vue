<template>
  <div class="el-collapse">
    <collapse-item v-for="group of inputGroups" :key="group.name" :title="group.name">
      <form>
        <div v-for="input of group.inputs" :key="input.id" class="input-box">
          <!--Label and port options-->
          <div class="input-title flex-baseline">
            <label class="input-label" :title="input.label || input.id">
              <span v-if="!input.type.isNullable" class="text-danger">*</span>
              <i class="fa fa-info-circle text-muted"></i>
              {{ input.label || input.id }}
              <span class="text-muted">({{ input.type.type }})</span>
            </label>
            <!--Port options for File and array of Files-->
            <div v-if="isType(input, ['File', 'Directory'])" class="port-controls"></div>
            <!--Port options for all other types-->
            <div v-if="!isType(input, ['File', 'Directory'])" class="input-control"></div>
          </div>
        </div>
      </form>
    </collapse-item>
  </div>
</template>

<script type="text/babel">
  import CollapseItem from '@/pages/application/_components/CollapseItem'
  export default {
    name: 'SelectionStepInputs',
    components: { CollapseItem },
    props: {
      step: {
        type: Object,
        default: null,
      },
    },
    computed: {
      inputGroups() {
        // Whenever inputs are updated, regroup them and sort them for display
        const grouped = this.step.in.reduce((acc, item) => {
          const group = this.isType(item, 'File') ? 'Files' : 'App parameters'
          return Object.assign(acc, group ? { [group]: (acc[group] || []).concat(item) } : null)
        }, {})
        // Order groups
        return Object.keys(grouped)
          .sort((a, b) => b.localeCompare(a))
          .map((key) => ({
            name: key,
            inputs: grouped[key],
          }))
      },
    },
    methods: {
      isType(input, types) {
        if (typeof types === 'string') {
          types = [types]
        }
        return !!types.find((type) => {
          return input.type.type === type || input.type.items === type
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet"></style>
