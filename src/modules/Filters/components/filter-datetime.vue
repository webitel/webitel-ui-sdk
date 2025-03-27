<template>
  <wt-datepicker
    :label="filterSchema.label"
    :value="value"
    mode="datetime"
    @input="setValue"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import getNamespacedState from '../../../store/helpers/getNamespacedState.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  filterQuery: {
    type: String,
    required: true,
  },
});

const store = useStore();

const filterSchema = computed(
  () => getNamespacedState(store.state, props.namespace)[props.filterQuery],
);

const value = computed(
  () => store.getters[`${props.namespace}/FILTER_${props.filterQuery}`],
);

const setValue = (value) => {
  const payload = { value, name: props.filterQuery };
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
};
</script>

<style scoped></style>
