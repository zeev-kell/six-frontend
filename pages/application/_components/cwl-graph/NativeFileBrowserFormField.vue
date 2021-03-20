<template>
  <input v-model="actualValue" class="form-control" />
</template>

<script type="text/babel">
  import { FormControl } from '@/pages/application/_components/FormControl'

  export default {
    name: 'NativeFileBrowserFormField',
    props: {
      formControl: {
        type: Object,
        default() {
          return new FormControl(null)
        },
      },
      selectionType: {
        type: String,
        default: '',
      },
    },
    computed: {
      actualValue: {
        get() {
          return this.formControl?.value
        },
        set(value) {
          this.formControl.setValue(value)
        },
      },
    },
  }
</script>
