<template>
  <wt-select
    :allow-custom-values="allowCustomValues"
    :label="label"
    :multiple="filterSchema.multiple"
    :options="localizedOptions"
    :track-by="filterSchema.storedProp"
    :value="value"
    v-bind="$attrs"
    @closed="
      setValueToQuery({
        value,
        filterQuery,
        storedProp: filterSchema.storedProp,
      })
    "
    @input="setValue({ filter: filterQuery, value: $event })"
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
  mixins: [enumFilterMixin],
  props: {
    filterQuery: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
