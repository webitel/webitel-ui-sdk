import _urlControllerMixin from '../_urlControllerMixin/_urlControllerMixin';

export default {
  mixins: [_urlControllerMixin],

  created() {
    this.restore({ filterQuery: this.filterQuery });
  },

  methods: {
    restore({ filterQuery }) {
      const value = this.getValueFromQuery({ filterQuery });
      if (value) this.restoreValue(value);
    },
  },
};
