import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],
  computed: {
    options() {
      return this.filterSchema.options;
    },
    locale() {
      return this.filterSchema?.locale;
    },
    storedProp() {
      return this.filterSchema?.storedProp;
    },
    multiple() {
      return this.filterSchema?.multiple;
    },
    closeOnSelect() {
      return this.filterSchema?.storedProp;
    },
  },
  methods: {
    restoreValue(value) {
      let newValue;
      if (Array.isArray(value)) {
        newValue = this.options
          .filter((option) => value
            .some((value) => value === option[this.storedProp]));
      } else {
        newValue = this.options
          .find((option) => value === option[this.storedProp]);
      }
      this.setValue({ filter: this.filterQuery, value: newValue });
    },
  },
};
