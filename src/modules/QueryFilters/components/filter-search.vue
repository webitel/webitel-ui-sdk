<template>
  <wt-search-bar
    :value="filterSchema.value"
    debounce
    :placeholder="$t('reusable.search')"
    @input="setValue({ filter: filterQuery, value: $event })"
    @search="setValueToQuery({ filterQuery, value: $event })"
  />
</template>

<script>
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin';

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

<style scoped>

</style>
