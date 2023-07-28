<template>
  <wt-select
    :value="value"
    :options="localizedOptions"
    :label="label"
    :track-by="filterSchema.storedProp"
    :option-label="filterSchema.storedProp"
    :multiple="filterSchema.multiple"
    v-bind="$attrs"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  ></wt-select>
</template>

<script>
import enumFilterMixin from '../mixins/enumFilterMixin';

export default {
  name: 'abstract-enum-filter',
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
