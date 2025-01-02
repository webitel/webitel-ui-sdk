<template>
  <wt-select
    :close-on-select="!filterSchema.multiple"
    :multiple="filterSchema.multiple"
    :options="options"
    :search-method="search"
    :track-by="trackBy"
    :value="value"
    v-bind="attrs"
    @input="setValue"
  />
</template>

<script setup>

import { computed, reactive, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import isEmpty from '../../../scripts/isEmpty.js';
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

const attrs = useAttrs();
const store = useStore();
const { t } = useI18n();

const filterSchema = computed(() => getNamespacedState(store.state, props.namespace)[props.filterQuery]);

const trackBy = computed(() => {
  if (filterSchema.value.storedProp !== undefined) {
    return filterSchema.value.storedProp;
  }

  if (filterSchema.value.search) {
    return 'id';
  }

  if (filterSchema.value.options) {
    return 'value';
  }

  return 'id';
});

const rawValue = computed(() => store.getters[`${props.namespace}/FILTER_${props.filterQuery}`]);

const cachedSearchOpts = reactive({});

const search = filterSchema.value.search && (async (selectParams) => {
  const params = {
    ...selectParams,
  };

  if (trackBy.value === 'id') {
    params.ids = Array.isArray(rawValue.value) ? rawValue.value : [rawValue.value];
  }

  const { items, ...rest } = await filterSchema.value.search(params);

  items.forEach((item) => {
    cachedSearchOpts[item.id] = item;
  });

  return {
    items,
    ...rest,
  };
});

const options = computed(() => {
  const options = filterSchema.value.options;

  return options;
});

const value = computed(() => {
  if (options.value) {
    if (filterSchema.value.multiple) {
      return options.value.filter((option) => rawValue.value.includes(option[trackBy.value]));
    }

    return options.value.find((option) => option[trackBy.value] === rawValue.value);
  }

  if (filterSchema.value.search) {
    if (filterSchema.value.multiple) {
      return rawValue.value.map((value) => cachedSearchOpts[value]);
    }

    return cachedSearchOpts[rawValue.value];
  }

  return rawValue.value;
});

const setValue = (value) => {
  const payload = {
    value: isEmpty(value) ? value : value[trackBy.value],
    name: props.filterQuery,
  };

  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
};
</script>

<style scoped>

</style>
