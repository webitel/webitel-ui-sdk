<template>
  <wt-input-text
    v-if="field.kind === FieldType.Text"
    v-bind="sharedChildrenProps"
    :model-value="value"
    @update:model-value="setValue"
  />
  <wt-input-number
    v-else-if="field.kind === FieldType.Number"
    v-bind="sharedChildrenProps"
    :model-value="value"
    @update:model-value="setValue"
  />
  <slot
    v-else-if="field.kind === FieldType.Boolean"
    :name="FieldType.Boolean"
    :default-props="{ ...sharedChildrenProps }"
  >
    <wt-switcher
      v-bind="sharedChildrenProps"
      :model-value="value"
      @update:model-value="setValue"
    />
  </slot>
  <slot
    v-else-if="field.kind === FieldType.Select"
    :name="FieldType.Select"
    :default-props="{
      ...sharedChildrenProps,
      ...selectProps,
      value,
    }"
  >
    <wt-single-select
      v-bind="sharedChildrenProps"
      :model-value="value"
      :search-method="loadLookupList(field.lookup)"
      data-key="id"
      @update:model-value="selectElement"
    />
  </slot>
  <slot
    v-else-if="field.kind === FieldType.Multiselect"
    :name="FieldType.Multiselect"
    :default-props="{
      ...sharedChildrenProps,
      ...multiselectProps,
      value,
    }"
  >
    <wt-multi-select
      v-bind="{ ...sharedChildrenProps, ...multiselectProps }"
      :model-value="value"
      @update:model-value="selectElements"
    />
  </slot>
  <slot
    v-else-if="field.kind === FieldType.Calendar"
    :name="FieldType.Calendar"
    :default-props="{
      ...sharedChildrenProps,
      value,
    }"
  >
    <wt-datepicker
      v-bind="sharedChildrenProps"
      :model-value="value"
      show-time
      @update:model-value="setValue"
    />
  </slot>
</template>

<script lang="ts" setup>
import { SysTypesAPI } from '@webitel/api-services/api';
import {
	WtDatepicker,
	WtMultiSelect,
	WtSingleSelect,
	WtSwitcher,
} from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type {
	WebitelProtoDataField,
	WebitelProtoDataTypeLookup,
} from 'webitel-sdk';

import { WtTypeExtensionFieldKind as FieldType } from '../../../enums';
import type { VuelidateFieldLike } from '../../../mixins/validationMixin/vuelidate/useVuelidateValidation';

const model = defineModel<unknown>();

const props = defineProps<{
	field: WebitelProtoDataField;
	label?: string;
	required?: boolean;
	/**
	 * TODO: implement validation
	 */
	v?: VuelidateFieldLike;
}>();

(
	props.v as
		| {
				$touch?: () => void;
		  }
		| undefined
)?.$touch?.();

const { t } = useI18n();

const computedLabel = computed(() => {
	return props.label || t(props.field?.name || 'vocabulary.labels');
});

const isRequired = computed(() => {
	return props.required ?? props.field.required;
});

// biome-ignore lint/suspicious/noExplicitAny: the value type follows `field.kind` at runtime
const value = computed<any>(() => {
	return model.value;
});

const sharedChildrenProps = computed(() => ({
	label: computedLabel.value,
	required: isRequired.value,
	v: props.v,
}));

/**
 * @author @dlohvinov
 *
 * props as computed is needed to pass it either
 * to slot and to default in-slot component
 */
const selectProps = computed(() => ({
	clearable: true,
	dataKey: 'id',
	searchMethod: loadLookupList(props.field.lookup),
}));

const multiselectProps = computed(() => ({
	...selectProps.value,
}));

interface LookupOption {
	id?: string;
	name?: string;
}

const setValue = (value: unknown) => {
	model.value = value;
};

const loadLookupList = ({
	path = '',
	display = '',
	primary = '',
}: WebitelProtoDataTypeLookup = {}) => {
	return (params: Record<string, unknown>) => {
		return SysTypesAPI.getLookup({
			...params,
			path,
			display,
			primary,
		});
	};
};

const selectElement = (value: unknown) => {
	const option = (value ?? {}) as LookupOption;
	if (Object.values(option).length === 0) {
		return setValue(null);
	}

	setValue({
		id: option.id,
		name: option.name,
	});
};

const selectElements = (value: unknown) => {
	setValue(
		(value as LookupOption[]).map((item) => ({
			id: item.id,
			name: item.name,
		})),
	);
};
</script>
