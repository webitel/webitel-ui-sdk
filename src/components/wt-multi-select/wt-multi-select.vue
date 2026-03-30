<template>
  <div class="wt-multi-select">
    <wt-label 
      v-if="hasLabel" 
      :disabled="disabled" 
      :invalid="invalid" 
      class="wt-select__label" 
      v-bind="labelProps">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <p-multi-select
      ref="selectRef"
      v-model="model"
      fluid
      input-class="typo-body-1"
      :display="chip ? 'chip' : 'comma'"
      :show-toggle-all="false"
      :invalid="invalid"
      :id="selectId"
      :show-clear="showClear"
      :disabled="disabled"
      :placeholder="placeholder || label"
      :option-disabled="() => disabledOptions"
      :options="filteredOptions"
      :option-label="(option) => getOptionLabel(option)"
      :option-value="optionValue"
      :loading="isLoading"
      :max-selected-labels="MAX_SELECTED_LABELS"
      :selectedItemsLabel="`${model.length} ${t('webitelUI.select.selectedItemsLabel')}`"
      :data-key="dataKey"
      v-bind="$attrs"
      @before-show="onDropdownBeforeShow"
      @before-hide="onDropdownBeforeHide"
      @show="onDropdownShow"
      @hide="onDropdownHide"
    >
      <template #header>
        <wt-input-text
          v-if="filterable"
          ref="filterInput"
          :model-value="filterText"
          @update:model-value="filterOptions($event)"
          @keydown.enter.stop="onInputKeydown"
        >
          <template #suffix>
            <wt-icon v-if="allowCustomValues && filterText" icon="select-custom-value-enter" />
            <wt-icon icon="search" />
          </template>
        </wt-input-text>
      </template>
      <template #option="{ option }">
        <span
          class="wt-multi-select__option-label"
          v-tooltip="getOptionLabel(option)"
        >
          {{ getOptionLabel(option) }}
        </span>
      </template>
      <template #itemcheckboxicon="{checked}">
        <wt-checkbox
          :selected="checked"
          class="wt-multi-select__option-checkbox"
        />
      </template>
      <template #clearicon="{clearCallback}">
        <wt-icon-btn 
          v-if="showClear && model"  
          icon="close" 
          @click="clearCallback"
        />
      </template>
      <template #dropdownicon>
        <wt-icon :icon="isDropdownOpen ? 'arrow-up' : 'arrow-down'" />
      </template>
      <template #chipicon="{removeCallback}">
        <wt-icon-btn 
          icon="close--filled" 
          size="sm"
          @click="removeCallback"
        />
      </template>
    </p-multi-select>
    <wt-message
      v-if="isValidation && validationText"
      :color="validationTextColor"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, useSlots, useTemplateRef } from 'vue';
import type { SelectProps } from 'primevue';
import { ComponentSize, MessageColor, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import { useSelect } from '../_internals/composables/useSelect/useSelect';
import { useI18n } from 'vue-i18n';
import { toArray } from '../_internals/composables/useSelect/useSelectUtils';

interface Props extends SelectProps {
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	/**
	 * true disables all options but keeps dropdown visible
	 */
	disabledOptions?: boolean;
	/**
	 * false disables options search
	 */
	filterable?: boolean;
	/**
	 * true shows the clear button
	 */
	showClear?: boolean;
	options?: unknown[];
	optionLabel?: string;
	optionValue?: string;
	/**
	 * A property to uniquely identify an option.
	 */
	dataKey?: string;
	/**
	 * Function that returns filtered options for server-side search
	 */
	searchMethod?: () => void;
	/**
	 * true allows adding custom values through the filter input
	 */
	allowCustomValues?: boolean;
	/**
	 * true emits custom values through the filter input instead of adding them automatically
	 */
	manualCustomValues?: boolean;
	chip?: boolean;
	labelProps?: object;
	v?: Record<string, unknown>;
	regleValidation?: RegleFieldStatus<string>;
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<Props>(), {
	filterable: true,
	options: () => [],
	optionLabel: 'label',
	dataKey: 'id',
	labelProps: () => ({}),
	customValidators: () => [],
});

const model = defineModel({
	default: [],
	get(value) {
		return toArray(value);
	},
});

const { t } = useI18n();

const MAX_SELECTED_LABELS = 3;

const selectId = `select-${Math.random().toString(36).slice(2, 11)}`;

const filterInput = useTemplateRef('filterInput');
const selectRef = useTemplateRef('selectRef');

const emit = defineEmits([
	'add:custom-value',
]);

const {
	isLoading,
	isDropdownOpen,
	filterText,
	filteredOptions,
	getOptionLabel,
	fetchOptions,
	onDropdownBeforeShow,
	onDropdownBeforeHide,
	onDropdownShow,
	onDropdownHide,
	filterOptions,
	onInputKeydown,
} = useSelect({
	selected: model,
	options: computed(() => props.options),
	optionLabel: computed(() => props.optionLabel),
	dataKey: computed(() => props.dataKey),
	allowCustomValues: computed(() => props.allowCustomValues),
	manualCustomValues: computed(() => props.manualCustomValues),
	filterInput,
	selectRef,
	searchMethod: computed(() => props.searchMethod),
	selectId: computed(() => selectId),
	isSingle: false,
	emit,
});

const slots = useSlots();

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
		regleValidation,
	});

const hasLabel = computed(() => {
	return props.label || slots.label;
});

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

onMounted(() => {
	if (props.searchMethod) fetchOptions();
});
</script>

<style scoped>
.wt-multi-select {
  width: 100%;
  min-width: 0;
}

.wt-multi-select__option-label {
  user-select: none;
}

.wt-multi-select__option-checkbox {
  pointer-events: none;
}
</style>