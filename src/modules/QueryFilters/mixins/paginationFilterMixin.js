import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  props: {
    isNext: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    isPrev() {
      return this.page > 1;
    },
  },

  methods: {
    restore() {
      this.restorePage();
      this.restoreSize();
    },

    restorePage() {
      const defaultPage = 1;
      const value = +this.getValueFromQuery({ filterQuery: 'page' }) || defaultPage;
      this.setPage(value);
    },

    restoreSize() {
      const defaultSize = 10;
      const value = +this.getValueFromQuery({ filterQuery: 'size' }) || defaultSize;
      this.setSize(value);
    },

    next() {
      this.$emit('input');
      const value = this.page + 1;
      this.setPage(value);
      this.setValueToQuery({
        filterQuery: 'page',
        value,
      });
    },

    prev() {
      this.$emit('input');
      const value = this.page - 1;
      this.setPage(value);
      this.setValueToQuery({
        filterQuery: 'page',
        value,
      });
    },

    sizeChange(value) {
      this.$emit('input');
      this.setSize(value);
      this.setValueToQuery({
        filterQuery: 'size',
        value,
      });
    },
  },
};
