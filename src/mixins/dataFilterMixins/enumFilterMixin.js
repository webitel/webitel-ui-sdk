import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    options: [],
    defaultValue: [],
    trackBy: 'value',
    storedProp: 'value',
  }),

  methods: {
    restoreValue(value) {
      if (Array.isArray(value)) {
        this.value = this.options
        .filter((option) => value.some((value) => `${value}` === option[this.storedProp]));
      } else {
        this.value = this.options
        .find((option) => option[this.storedProp] === value) || this.defaultValue;
      }
    },
  },
};
