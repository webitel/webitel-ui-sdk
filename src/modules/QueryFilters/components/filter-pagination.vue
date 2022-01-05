<template>
  <wt-pagination
    :next="isNext"
    :prev="isPrev"
    :size="sizeFilterSchema.value"
    debounce
    @change="sizeChange"
    @next="next"
    @prev="prev"
  ></wt-pagination>
</template>

<script>
import getNamespacedState from '../../../store/helpers/getNamespacedState';
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-pagination',
  mixins: [baseFilterMixin],
  props: {
    isNext: {
      type: Boolean,
      default: true,
    },
    pageFilterQuery: {
      type: String,
      default: 'page',
    },
    sizeFilterQuery: {
      type: String,
      default: 'size',
    },
  },

  computed: {
    pageFilterSchema() {
      if (!this.$store) throw new Error('Vuex is required for page filter binding');
      return getNamespacedState(this.$store.state, this.namespace)[this.pageFilterQuery];
    },
    sizeFilterSchema() {
      if (!this.$store) throw new Error('Vuex is required for size filter binding');
      return getNamespacedState(this.$store.state, this.namespace)[this.sizeFilterQuery];
    },
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
      const value = +this.getValueFromQuery({ filterQuery: this.pageFilterQuery });
      if (value) this.setValue({ filter: this.pageFilterQuery, value });
    },

    restoreSize() {
      const value = +this.getValueFromQuery({ filterQuery: this.sizeFilterQuery });
      if (value) this.setValue({ filter: this.sizeFilterQuery, value });
    },

    next() {
      this.$emit('input');
      const value = this.pageFilterSchema.value + 1;
      this.setValue({ filter: this.pageFilterQuery, value });
      this.setValueToQuery({
        filterQuery: this.pageFilterQuery,
        value,
      });
    },

    prev() {
      this.$emit('input');
      const value = this.pageFilterSchema.value - 1;
      this.setValue({ filter: this.pageFilterQuery, value });
      this.setValueToQuery({
        filterQuery: this.pageFilterQuery,
        value,
      });
    },

    resetPage() {
      this.$emit('input');
      const value = this.pageFilterSchema.defaultValue;
      this.setValue({ filter: this.pageFilterQuery, value });
      this.setValueToQuery({
        filterQuery: this.pageFilterQuery,
        value,
      });
    },

    sizeChange(value) {
      this.$emit('input');
      this.setValue({ filter: this.sizeFilterQuery, value });
      this.setValueToQuery({
        filterQuery: this.sizeFilterQuery,
        value,
      });
    },
  },
};

</script>

<style scoped>

</style>
