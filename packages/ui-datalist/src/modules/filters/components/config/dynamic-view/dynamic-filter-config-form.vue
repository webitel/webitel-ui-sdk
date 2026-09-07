<template>
  <form class="dynamic-filter-config-form" @submit.prevent>
    <wt-single-select
      v-if="!columnMode"
      :show-clear="false"
      :disabled="editMode"
      :label="t('webitelUI.filters.filterName')"
      :options="filterConfigOptions"
      option-label="label"
      :model-value="filterName"
      data-key="name"
      option-value="name"
      required
      :v="v$.filterName"
      @update:model-value="onFilterNameUpdate($event)"
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
        v-if="filterName && selectedFilterConfig"
        :key="filterName"
        :model-value="filterValue"
        :filter-config="selectedFilterConfig"
        :label="valueInputLabelText"
        @update:model-value="onValueChange"
        @update:invalid="onValueInvalidChange"
      />
    </slot>

    <dynamic-filter-config-form-label
      v-if="!columnMode"
      :value="filterLabel"
      @update:model-value="onLabelValueUpdate"
      @update:invalid="(v) => (invalid = v)"
    />

    <footer class="dynamic-filter-config-form-footer">
      <wt-button
        :disabled="isSubmitDisabled"
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtButton, WtSingleSelect } from '@webitel/ui-sdk/components';
import { isEmpty } from '@webitel/ui-sdk/scripts';
import deepcopy from 'deep-copy';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { FilterInitParams, IFilter } from '../../../classes/Filter';
import { BaseFilterConfig } from '../../../modules/filterConfig/classes/FilterConfig';
import DynamicFilterConfigFormLabel from './dynamic-filter-config-form-label.vue';
import DynamicFilterConfigFormValueInput from './dynamic-filter-config-form-value-input.vue';

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
	/**
	 * @description
	 * Column filter mode: the filter is fixed by `filterConfig`, so only the value input is shown
	 * (no filter name select, no label), and Save goes through with an empty value —
	 * clearing the field with its "x" and saving deletes the filter.
	 *
	 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
	 */
	columnMode?: boolean;
}>();

const emit = defineEmits<{
	submit: [
		FilterInitParams,
	];
	cancel: [];
}>();

const { t } = useI18n();

const filterName = ref<string | undefined>(props.filterConfig?.name);
const filterLabel = ref('');
const filterValue = ref();

const editMode = !!props.filter;

const v$ = useVuelidate(
	computed(() => ({
		filterName: {
			required,
		},
	})),
	{
		filterName,
	},
	{
		$autoDirty: true,
	},
);
v$.value.$touch();

const invalid = ref(false);

const isSubmitDisabled = computed(() => {
	if (v$.value.$invalid) return true;
	if (props.columnMode && isEmpty(filterValue.value)) return false;

	return invalid.value;
});

const filterConfigOptions = computed(() => {
	if (props.filterConfig) {
		return [
			props.filterConfig,
		];
	}

	return props.filterConfigs ?? [];
});

const selectedFilterConfig = computed(() => {
	if (props.filterConfig) {
		return props.filterConfig;
	}

	return filterConfigOptions.value.find((filterConfig) => {
		return filterConfig.name === filterName.value;
	});
});

const onValueChange = (v: unknown) => {
	filterValue.value = v;
};

const onValueInvalidChange = (v: boolean) => {
	invalid.value = v;
};

const valueInputLabelText = computed(() => {
	return t('webitelUI.filters.filterValue');
});

const onLabelValueUpdate = (val?: string) => {
	filterLabel.value = val ?? '';
};

const onFilterNameUpdate = (val: string) => {
	filterName.value = val;
	filterValue.value = null;
	invalid.value = false;
};

const submit = () => {
	if (!filterName.value) return;

	emit('submit', {
		name: filterName.value,
		label: filterLabel.value,
		value: filterValue.value,
	});
};

const editedFilter = props.filter;
if (editedFilter) {
	watch(
		editedFilter,
		() => {
			filterName.value = editedFilter.name;
			filterValue.value = deepcopy(editedFilter.value);
			filterLabel.value = editedFilter.label ?? '';
		},
		{
			immediate: true,
		},
	);
}
</script>

<style lang="scss" scoped>
$form-width: 380px;

.dynamic-filter-config-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  padding: var(--spacing-xs) 0;
  width: $form-width;
}

.dynamic-filter-config-form-footer {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
