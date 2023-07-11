<template>
  <wt-table-column-select
    :headers="headers"
    :static-headers="staticHeaders"
    @change="handleChange"
  ></wt-table-column-select>
</template>

<script setup>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed } from 'vue';
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
  },
});

const emit = defineEmits(
  'change',
);

// const storedProp = 'value';
const filterQuery = 'fields';

const store = useStore();

const filterSchema = computed(() => getNamespacedState(store.state, props.namespace)[filterQuery]);

function setValue(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

function setToLocalStorage({ value }) {
  localStorage.setItem(filterSchema.value.localStorageKey, value);
}

function handleChange(headers) {
  const value = headers.filter((item) => item.show).map(({ value }) => value);
  const params = {
    filter: filterQuery,
    value,
  };
  setToLocalStorage(params);
  setValue(params);
  emit('change', headers);
}
</script>

<style scoped>

</style>
