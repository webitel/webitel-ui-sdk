<template>
  <wt-search-bar
    :value="filterSchema.value"
    debounce
    @input="setValue({ filter: filterQuery, value: $event })"
    @search="setValueToQuery({ filterQuery, value: $event })"
    :placeholder="$t('reusable.search')"
  />
</template>

<script>
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-search',
  mixins: [baseFilterMixin],
  props: {
    filterQuery: {
      type: String,
      default: 'search',
    },
  },
  methods: {
    restoreValue(value) {
      this.setValue({ filter: this.filterQuery, value });
    },
  },
};
</script>

<style scoped>

</style>
