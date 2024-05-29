<template>
  <wt-select
    :close-on-select="filterSchema.closeOnSelect"
    :label="label"
    :multiple="filterSchema.multiple"
    :search-method="search"
    :track-by="filterSchema.storedProp"
    :value="filterSchema.value"
    v-bind="$attrs"
    @closed="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  />
</template>

<script>
import apiFilterMixin from '../mixins/apiFilterMixin.js';

export default {
  name: 'AbstractApiFilter',
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
    async fetchSelected(...args) {
      const { items = [] } = await this.filterSchema.fetchSelected(...args);
      return items;
    },
  },
};
</script>

<style scoped>

</style>
