<template>
  <wt-search-bar
    :search-mode="multisearch && filterName"
    :search-mode-options="multisearch && searchModeOpts"
    :hint="multisearch && currentSearchMode.hint"
    :value="localValue"
    :v="multisearch && v$"
    class="filter-search"
    @input="localValue = $event"
    @search="setValue({ name: filterName, value: localValue })"
    @update:search-mode="changeMode"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FilterEvent from '../enums/FilterEvent.enum.js';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  multisearch: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'q',
  },
  searchModeOpts: {
    type: Array,
    default: () => [],
  },
});

const store = useStore();

function getValue(filter) {
  return store.getters[`${props.namespace}/GET_FILTER`](filter);
}

function setValue(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

const filterName = ref(
  props.multisearch ? props.searchModeOpts[0].value : props.name,
);

const currentSearchMode = computed(() =>
  props.searchModeOpts.find(({ value }) => value === filterName.value),
);

const filterValue = computed(() => getValue(filterName.value));

const localValue = ref(filterValue.value);

const v$ =
  props.multisearch &&
  useVuelidate(
    computed(() => {
      return {
        localValue: {
          ...(currentSearchMode.value.v || {}),
        },
      };
    }),
    { localValue },
    { $autoDirty: true },
  );

if (v$) v$.value.$touch();

async function changeMode({ value }, { clearValue = true } = {}) {
  if (clearValue) await setValue({ name: filterName.value, value: '' });
  filterName.value = value;
}

function restoreSearchMode() {
  const mode = props.searchModeOpts.find(({ value }) => !!getValue(value));
  if (mode) changeMode({ value: mode.value }, { clearValue: false });
}

function subscribe(payload) {
  store.dispatch(`${props.namespace}/SUBSCRIBE`, payload);
}

subscribe({
  event: FilterEvent.RESTORED,
  callback: restoreSearchMode,
});

watch(
  () => filterValue.value,
  () => {
    localValue.value = filterValue.value;
  },
);
</script>

<style lang="scss" scoped></style>
