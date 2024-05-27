<template>
  <wt-table-column-select
    :headers="headers"
    :static-headers="staticHeaders"
    @change="change"
  />
</template>

<script>
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin.js';

export default {
  name: 'FilterTableFields',
  mixins: [baseFilterMixin],

  model: {
    prop: 'headers',
    event: 'change',
  },
  props: {
    entity: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    staticHeaders: {
      type: Array,
    },
  },

  data: () => ({
    storedProp: 'value',
    filterQuery: 'fields',
  }),

  methods: {
    change(headers) {
      this.setValue(headers);
    },

    // overrides baseFilterMixin method
    restore({ filterQuery }) {
      const queryValue = this.getValueFromQuery({ filterQuery });
      const storageValue = this.getFromLocalStorage({ filterQuery });
      if (!queryValue && storageValue) {
        this.setValueToQuery({
          filterQuery,
          value: storageValue,
          storedProp: this.storedProp,
        });
      }
      if (queryValue || storageValue) {
        this.restoreValue(queryValue || storageValue);
      }
    },

    restoreValue(value) {
      const headers = this.headers.map((header) => ({
        ...header,
        show: !!value.includes(header.value),
      }));
      this.$emit('change', headers);
    },

    setValue(headers) {
      const value = headers.filter((item) => item.show);
      const params = {
        filterQuery: this.filterQuery,
        value,
        storedProp: this.storedProp,
      };
      this.setValueToQuery(params);
      this.setToLocalStorage(params);
      this.$emit('change', headers);
    },

    getFromLocalStorage({ filterQuery }) {
      const value = localStorage.getItem(`${this.entity}-${filterQuery}`);
      return value ? value.split(',') : null;
    },

    // copy-pasted params from "setValueArrayToQuery method
    // for easier future refactors, if method should be abstract
    setToLocalStorage({
                        filterQuery,
                        value,
                        storedProp = 'id',
                      }) {
      const filter = value.map((item) => item[storedProp]);
      localStorage.setItem(`${this.entity}-${filterQuery}`, filter);
    },
  },
};
</script>

<style scoped>

</style>
