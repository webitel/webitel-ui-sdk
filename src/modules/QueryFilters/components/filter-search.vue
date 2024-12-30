<template>
  <wt-search-bar
    :placeholder="$t('reusable.search')"
    :value="filterSchema.value"
    debounce
    @input="setValue({ filter: filterQuery, value: $event })"
    @search="setValueToQuery({ filterQuery, value: $event })"
  />
</template>

<script>
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin.js';

export default {
  name: 'FilterSearch',
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

<style scoped></style>
