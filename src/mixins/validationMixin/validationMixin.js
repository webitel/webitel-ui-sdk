export default {
  props: {
    // validation rules
    v: {
      type: Object,
    },
  },
  computed: {
    isValidation() {
      return !!this.v && !!Object.keys(this.v).length;
    },
    invalid() {
      return this.isValidation && this.v.$error;
    },
    validationText() {
      if (this.isValidation && this.invalid) {
        if (this.v.required === false) {
          return this.$t('validation.required');
        }
        if (this.v.numeric === false) {
          return this.$t('validation.numeric');
        }
        if (this.v.email === false) {
          return this.$t('validation.email');
        }
      }
      return '';
    },
  },
};
