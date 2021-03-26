import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],
  computed: {
    options() {
      return [];
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
