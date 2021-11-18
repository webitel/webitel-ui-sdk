<template>
  <wt-select
    :value="filterSchema.value"
    :label="$t(filterSchema.locale.label)"
    :track-by="filterSchema.storedProp"
    :multiple="filterSchema.multiple"
    :search-method="search"
    :close-on-select="filterSchema.closeOnSelect"
    v-bind="$attrs"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  ></wt-select>
</template>

<script>
import apiFilterMixin from '../mixins/apiFilterMixin';

export default {
  name: 'abstract-api-filter',
  mixins: [apiFilterMixin],
  props: {
    filterQuery: {
      type: String,
      required: true,
    },
  },
  methods: {
    search(params) {
      return this.filterSchema.search(params);
    },
    fetchSelected(...args) {
      return this.filterSchema.fetchSelected(...args);
    },
  },
};
</script>

<style scoped>

</style>
