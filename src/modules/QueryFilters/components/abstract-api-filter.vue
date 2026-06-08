<template>
  <wt-single-select
    v-if="!filterSchema.multiple"
    :label="label"
    :search-method="search"
    :data-key="filterSchema.storedProp"
    :model-value="filterSchema.value"
    v-bind="$attrs"
    @hide="
      setValueToQuery({
        value,
        filterQuery,
        storedProp: filterSchema.storedProp,
      })
    "
    @update:model-value="setValue({ filter: filterQuery, value: $event })"
    @reset="
      setValueToQuery({
        value,
        filterQuery,
        storedProp: filterSchema.storedProp,
      })
    "
  />

  <wt-multi-select
    :label="label"
    :search-method="search"
    :data-key="filterSchema.storedProp"
    :model-value="filterSchema.value"
    v-bind="$attrs"
    @hide="
      setValueToQuery({
        value,
        filterQuery,
        storedProp: filterSchema.storedProp,
      })
    "
    @update:model-value="setValue({ filter: filterQuery, value: $event })"
    @reset="
      setValueToQuery({
        value,
        filterQuery,
        storedProp: filterSchema.storedProp,
      })
    "
  />
</template>

<script>
import apiFilterMixin from '../mixins/apiFilterMixin.js';

export default {
	name: 'AbstractApiFilter',
	mixins: [
		apiFilterMixin,
	],
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

<style scoped></style>
