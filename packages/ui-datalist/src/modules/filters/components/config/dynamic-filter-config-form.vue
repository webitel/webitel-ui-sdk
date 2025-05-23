<template>
  <form class="dynamic-filter-config-form">
    <wt-select
      v-if="!isStaticMode"
      :clearable="false"
      :disabled="editMode"
      :label="t('webitelUI.filters.filterName')"
      :options="filterConfigOptions"
      :value="filterName"
      option-label="label"
      track-by="name"
      use-value-from-options-by-prop="name"
      @input="onFilterNameUpdate($event)"
    />

    <slot
      name="value-input"
      v-bind="{
        filterName,
        filterValue,
        inputLabel: valueInputLabelText,
        onValueChange,
        onValueInvalidChange,
      }"
    >
      <dynamic-filter-config-form-value-input
        v-if="isStaticMode ? true : filterName"
        :key="filterName"
        :filter-config="selectedFilterConfig"
        :label="valueInputLabelText"
        :model-value="filterValue"
        @submit="submit"
        @update:model-value="onValueChange"
        @update:invalid="onValueInvalidChange"
      />
    </slot>

    <dynamic-filter-config-form-label
      v-if="!isStaticMode"
      :value="filterLabel"
      @update:model-value="onLabelValueUpdate"
      @update:invalid="(v) => (invalid = v)"
    />

    <footer
      v-if="!isStaticMode"
      class="dynamic-filter-config-form-footer">
      <wt-button
        :disabled="invalid"
        wide
        @click="submit"
      >
        {{ t('reusable.save') }}
      </wt-button>

      <wt-button
        color="secondary"
        wide
        @click="emit('cancel')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </footer>
  </form>
</template>

<script lang="ts" setup>
import { WtButton, WtSelect } from '@webitel/ui-sdk/components';
import deepcopy from 'deep-copy';
import { computed, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {FilterInitParams, IFilter} from "../../classes/Filter";
import {BaseFilterConfig} from "../../modules/filterConfig/classes/FilterConfig";
import DynamicFilterConfigFormLabel from './dynamic-filter-config-form-label.vue';
import DynamicFilterConfigFormValueInput from "./dynamic-filter-config-form-value-input.vue";

const props = defineProps<{
  /**
   * @description
   * "Add" mode
   */
  filterConfigs?: BaseFilterConfig[];
  /**
   * @description
   * "Edit" mode
   */
  filterConfig?: BaseFilterConfig;
  /**
   * @description
   * Edited filter instance
   */
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

const editMode = !!props.filter;

const invalid = ref(false);

const isStaticMode = inject('isStaticMode');

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

const onValueInvalidChange = (v) => {
  invalid.value = v;
};

const valueInputLabelText = computed(() => {
  return t('webitelUI.filters.filterValue');
});

const onLabelValueUpdate = (val: string) => {
  filterLabel.value = val;
};

const onFilterNameUpdate = (val: string) => {
  filterName.value = val;
  filterValue.value = null;
  invalid.value = false;
};

const submit = () => {
  emit('submit', {
    name: filterName.value,
    label: filterLabel.value,
    value: filterValue.value,
  });
};

if (props.filter) {
  watch(
    () => props.filter.value,
    () => {
      filterName.value = props.filter.name;
      filterValue.value = deepcopy(props.filter.value);
      filterLabel.value = props.filter.label;
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
