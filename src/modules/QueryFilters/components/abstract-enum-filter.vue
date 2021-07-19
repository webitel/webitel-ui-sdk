<template>
  <wt-select
    :value="filterSchema.value"
    :options="filterSchema.options"
    :label="$t(filterSchema.locale.label)"
    :track-by="filterSchema.storedProp"
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
  // computed: {
  //   options() {
  //     return this.filterSchema.options.map((item) => ({
  //       ...item,
  //         name: typeof item.locale === 'string' ? this.$t(item.locale) : this.$t(...item.locale),
  //     }));
  //   },
  // },
};
</script>

<style scoped>

</style>
