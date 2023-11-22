<template>
  <wt-select
    v-bind="$attrs"
    :value="value"
    :options="localizedOptions"
    :label="label"
    :track-by="filterSchema.storedProp"
    :multiple="filterSchema.multiple"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  />
</template>

<script>
import enumFilterMixin from '../mixins/enumFilterMixin';

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

<style scoped>

</style>
