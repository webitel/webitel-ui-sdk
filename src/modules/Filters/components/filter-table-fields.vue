<template>
  <wt-table-column-select
    :headers="headers"
    :static-headers="staticHeaders"
    @change="handleChange"
  />
</template>

<script setup>
import { useStore } from 'vuex';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  staticHeaders: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['change']);

const filterQuery = 'fields';

const store = useStore();

function setValue(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

function handleChange(headers) {
  const value = headers.filter((item) => item.show).map(({ value }) => value);
  const params = {
    name: filterQuery,
    value,
  };
  setValue(params);
  emit('change', headers);
}
</script>

<style scoped>

</style>
