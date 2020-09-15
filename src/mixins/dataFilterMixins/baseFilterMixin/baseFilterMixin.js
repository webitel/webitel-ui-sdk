import _urlControllerMixin from '../_urlControllerMixin/_urlControllerMixin';

export default {
  mixins: [_urlControllerMixin],
  data: () => ({
    defaultValue: '',
  }),

  watch: {
    '$route.query': {
      handler(newValue, oldValue) {
        if (newValue[this.filterQuery] !== oldValue[this.filterQuery]) {
          this.restore({ filterQuery: this.filterQuery });
        }
      },
    },
  },

  created() {
    this.restore({ filterQuery: this.filterQuery });
  },

  methods: {
    restore({ filterQuery }) {
      const value = this.getValueFromQuery({ filterQuery }) || this.defaultValue;
      this.restoreValue(value);
    },
  },
};
