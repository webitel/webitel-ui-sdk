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
        if (this.v.required === false) return this.$t('validation.required');
        if (this.v.numeric === false) return this.$t('validation.numeric');
        if (this.v.email === false) return this.$t('validation.email');
        if (this.v.gatewayHostValidator === false) return this.$t('validation.gatewayHostValidator');
        if (this.v.ipValidator === false) return this.$t('validation.ipValidator');
        if (this.v.macValidator === false) return this.$t('validation.macValidator');
        if (this.v.minValue === false) return `${this.$t('validation.minValue')} ${this.v.$params.minValue.min}`;
        if (this.v.maxValue === false) return `${this.$t('validation.maxValue')} ${this.v.$params.maxValue.max}`;
        if (this.v.sipAccountValidator === false) return this.$t('validation.sipAccountValidator');
      }
      return '';
    },
  },
};
