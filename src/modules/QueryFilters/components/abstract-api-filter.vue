<template>
  <wt-select
    v-bind="$attrs"
    :value="filterSchema.value"
    :label="label"
    :track-by="filterSchema.storedProp"
    :multiple="filterSchema.multiple"
    :search-method="search"
    :close-on-select="filterSchema.closeOnSelect"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  />
</template>

<script>
import apiFilterMixin from '../mixins/apiFilterMixin';

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
