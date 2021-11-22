import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],
  computed: {
    options() {
      return this.filterSchema?.options;
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
    localizedOptions() {
      const optsHaveLocale = this.options.length && this.options[0].locale; // just check 1st el
      if (optsHaveLocale) {
        return this.options.map((opt) => ({
          ...opt,
          name: Array.isArray(opt.locale) ? this.$tc(...opt.locale) : this.$t(opt.locale),
        }));
      }
      return this.options;
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
