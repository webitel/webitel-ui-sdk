<template>
  <form class="dynamic-filter-config-form">
    <slot
      name="value-input"
      v-bind="{
        filterName,
        filterValue,
        onValueChange,
        onValueInvalidChange,
      }"
    >
      <dynamic-filter-config-form-value-input
        :key="filterName"
        :filter-config="selectedFilterConfig"
        :label="filterLabel"
        :model-value="filterValue"
        @submit="submit"
        @update:model-value="onValueChange"
        @update:invalid="onValueInvalidChange"
      />
    </slot>
  </form>
</template>

<script lang="ts" setup>
import deepcopy from 'deep-copy';
import { computed, onUpdated, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {FilterInitParams, IFilter} from "../classes/Filter";
import {BaseFilterConfig} from "../modules/filterConfig/classes/FilterConfig";
import DynamicFilterConfigFormValueInput from "./config/dynamic-filter-config-form-value-input.vue";

const props = defineProps<{
  filterConfigs?: BaseFilterConfig[];
  filterConfig?: BaseFilterConfig;
  filter?: IFilter;
}>();

const emit = defineEmits<{
  submit: [FilterInitParams];
  cancel: [];
}>();


const { t } = useI18n();

const filterName = ref();
const filterLabel = ref('');
const filterValue = ref();

const invalid = ref(false);

const filterConfigOptions = computed(() => {
  if (props.filterConfig) {
    return [props.filterConfig];
  }

  return props.filterConfigs;
});

const selectedFilterConfig = computed(() => {
  if (props.filterConfig) {
    return props.filterConfig;
  }

  return filterConfigOptions.value.find((filterConfig) => {
    return filterConfig.name === filterName.value;
  });
});

const onValueChange = (v) => {
  filterValue.value = v;
};

const submit = () => {
  emit('submit', {
    name: filterName.value,
    label: filterLabel.value,
    value: filterValue.value,
  });
}

const onValueInvalidChange = (v) => {
  invalid.value = v;
};

if (props.filter) {
  watch(
    () => props.filter.value,
    () => {
      filterName.value = props.filter.name;
      filterValue.value = deepcopy(props.filter.value);
      filterLabel.value = props.filterConfig.label;
    },
    { immediate: true },
  );
}
</script>

<style lang="scss" scoped>
$form-width: 380px;

.dynamic-filter-config-form {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: $form-width;
  padding: var(--spacing-xs) 0;
  gap: var(--spacing-xs);
}

.dynamic-filter-config-form-footer {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
