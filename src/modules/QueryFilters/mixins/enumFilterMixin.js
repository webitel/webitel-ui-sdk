import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],
  props: {
    // for more detail, see allowCustomValues wt-select component prop
    allowCustomValues: {
      type: Boolean,
      default: false,
    },
  },
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
    label() {
      return Array.isArray(this.locale.label)
        ? this.$tc(...this.locale.label)
        : this.$t(this.locale.label);
    },
    localizedOptions() {
      const optsHaveLocale = this.options.length && this.options[0].locale; // just check 1st el
      if (optsHaveLocale) {
        return this.options.map((opt) => ({
          ...opt,
          name: Array.isArray(opt.locale)
            ? this.$tc(...opt.locale)
            : this.$t(opt.locale),
        }));
      }
      return this.options;
    },
  },
  methods: {
    restoreValue(value) {
      let newValue;
      if (Array.isArray(value)) {
        /*
        restore not just value, but value with all client-side properties like locale
         */
        newValue = this.localizedOptions
        .filter((option) => value
        .some((value) => value === option[this.storedProp]));

        /*
        but if allowCustomValues is true, we should also restore custom values,
        which isn't present in localizedOptions
         */
        if (this.allowCustomValues) {
          newValue = newValue.concat(
            value
            .filter((val) => !this.localizedOptions
            .some((option) => val === option[this.storedProp]))
            .map((val) => ({ [this.storedProp]: val, name: val })),
          );
        }
      } else {
        /*
        see comments above
         */
        newValue = this.localizedOptions
        .find((option) => value === option[this.storedProp]);
        if (this.allowCustomValues) {
          newValue = newValue || { [this.storedProp]: value, name: value };
        }
      }
      this.setValue({ filter: this.filterQuery, value: newValue });
    },
  },
};
