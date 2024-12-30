import baseFilterMixin from './baseFilterMixin/baseFilterMixin.js';

export default {
  mixins: [baseFilterMixin],

  data: () => ({
    value: [],
    defaultValue: [],
    trackBy: 'value',
    storedProp: 'value',
  }),

  computed: {
    options() {
      return [];
    },
  },

  methods: {
    restoreValue(value) {
      if (Array.isArray(value)) {
        this.value = this.options.filter((option) =>
          value.some((value) => `${value}` === option[this.storedProp]),
        );
      } else {
        this.value =
          this.options.find((option) => option[this.storedProp] === value) ||
          this.defaultValue;
      }
    },
  },
};
