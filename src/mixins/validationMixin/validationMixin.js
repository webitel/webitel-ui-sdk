export default {
  props: {
    // validation rules
    v: {
      type: Object,
    },
    customValidators: {
      type: Array,
      default: () => [],
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
      let validationText = '';
      if (this.isValidation && this.invalid) {
        if (this.v.required === false) validationText = this.$t('validation.required');
        if (this.v.numeric === false) validationText = this.$t('validation.numeric');
        if (this.v.email === false) validationText = this.$t('validation.email');
        if (this.v.gatewayHostValidator === false) validationText = this.$t('validation.gatewayHostValidator');
        if (this.v.ipValidator === false) validationText = this.$t('validation.ipValidator');
        if (this.v.macValidator === false) validationText = this.$t('validation.macValidator');
        if (this.v.minValue === false) validationText = `${this.$t('validation.minValue')} ${this.v.$params.minValue.min}`;
        if (this.v.maxValue === false) validationText = `${this.$t('validation.maxValue')} ${this.v.$params.maxValue.max}`;
        if (this.v.sipAccountValidator === false) validationText = this.$t('validation.sipAccountValidator');
        if (this.v.minLength === false) validationText = `${this.$t('validation.minLength')} ${this.v.$params.minLength.min}`;
        if (this.v.url === false) validationText = `${this.$t('validation.url')}`;
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const { name, text } of this.customValidators) {
        if (this.v[name] === false) validationText = text;
      }
      return validationText;
    },
  },
};
