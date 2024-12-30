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
        if (this.v.required?.$invalid)
          validationText = this.$t('validation.required');
        else if (this.v.numeric?.$invalid)
          validationText = this.$t('validation.numeric');
        else if (this.v.email?.$invalid)
          validationText = this.$t('validation.email');
        else if (this.v.gatewayHostValidator?.$invalid)
          validationText = this.$t('validation.gatewayHostValidator');
        else if (this.v.ipValidator?.$invalid)
          validationText = this.$t('validation.ipValidator');
        else if (this.v.macValidator?.$invalid)
          validationText = this.$t('validation.macValidator');
        else if (this.v.minValue?.$invalid)
          validationText = `${this.$t('validation.minValue')} ${this.v.minValue.$params.min}`;
        else if (this.v.maxValue?.$invalid)
          validationText = `${this.$t('validation.maxValue')} ${this.v.maxValue.$params.max}`;
        else if (this.v.sipAccountValidator?.$invalid)
          validationText = this.$t('validation.sipAccountValidator');
        else if (this.v.minLength?.$invalid)
          validationText = `${this.$t('validation.minLength')} ${this.v.minLength.$params.min}`;
        else if (this.v.url?.$invalid)
          validationText = `${this.$t('validation.url')}`;
        else if (this.v.regExpValidator?.$invalid)
          validationText = `${this.$t('validation.regExpValidator')}`;
        else if (this.v.sameAs?.$invalid)
          validationText = `${this.$t('validation.sameAs')}`;
        else if (this.v.domainValidator?.$invalid)
          validationText = `${this.$t('validation.domainValidator')}`;
        else if (this.v.decimalValidator?.$invalid)
          validationText = `${this.$t('validation.decimalValidator')} ${this.v.decimalValidator.$params.count}`;
        else if (this.v.websocketValidator?.$invalid)
          validationText = `${this.$t('validation.websocketValidator')}`;
        else if (this.v.integer?.$invalid)
          validationText = `${this.$t('validation.integer')}`;
        else if (this.v.isRegExpMatched?.$invalid)
          validationText =
            this.v.isRegExpMatched?.$params?.errorMessage ||
            `${t('validation.isRegExpMatched')} ${this.v.isRegExpMatched?.$params?.regExp}`;
      }

      for (const { name, text } of this.customValidators) {
        if (this.v[name]?.$invalid) validationText = text;
      }
      return validationText;
    },
  },
};
