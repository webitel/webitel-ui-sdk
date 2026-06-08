<template>
  <wt-single-select
    v-if="!filterSchema.multiple"
    :allow-custom-values="allowCustomValues"
    :label="label"
    :options="localizedOptions"
    :data-key="filterSchema.storedProp"
    :model-value="value"
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
    v-else
    :allow-custom-values="allowCustomValues"
    :label="label"
    :options="localizedOptions"
    :data-key="filterSchema.storedProp"
    :model-value="value"
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
import enumFilterMixin from '../mixins/enumFilterMixin.js';

export default {
	name: 'AbstractEnumFilter',
	mixins: [
		enumFilterMixin,
	],
	props: {
		filterQuery: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped></style>
