import baseFilterMixin from './baseFilterMixin/baseFilterMixin';

export default {
  mixins: [baseFilterMixin],

  props: {
    isNext: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    page: '1',
    size: '10',
  }),

  watch: {
    '$route.query': {
      handler(newValue, oldValue) {
        if (newValue.page !== oldValue.page
          || newValue.size !== oldValue.size) {
          this.restore();
        }
      },
    },
  },

  computed: {
    isPrev() {
      return +this.page > 1;
    },
  },

  methods: {
    restore() {
      this.restorePage();
      this.restoreSize();
    },

    restorePage() {
      const page = '1';
      this.page = this.getValueFromQuery({ filterQuery: 'page' }) || page;
    },

    restoreSize() {
      const size = '10';
      this.size = this.getValueFromQuery({ filterQuery: 'size' }) || size;
    },

    next() {
      this.$emit('input');
      const value = `${+this.page + 1}`;
      this.page = value;
      this.setValueToQuery({
        filterQuery: 'page',
        value,
      });
    },

    prev() {
      this.$emit('input');
      const value = `${+this.page - 1}`;
      this.page = value;
      this.setValueToQuery({
        filterQuery: 'page',
        value,
      });
    },

    sizeChange(value) {
      this.$emit('input');
      this.setValueToQuery({
        filterQuery: 'size',
        value,
      });
    },
  },
};
