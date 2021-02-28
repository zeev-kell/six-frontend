export default {
  data() {
    return {
      validationState: {},
    }
  },
  methods: {
    afterModelValidation() {
      this.validationState = {
        ...this.validationState,
        errors: this.dataModel.errors || [],
        warnings: this.dataModel.warnings || [],
        isPending: false,
      }
    },
  },
}
