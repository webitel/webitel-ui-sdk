<template>
  <div class="wt-single-select">
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
    <p-select
      ref="selectRef"
      v-model="model"
      fluid
      input-class="typo-body-1"
      :invalid="invalid"
      :id="selectId"
      :show-clear="showClear"
      :focus-on-hover="false"
      :disabled="disabled"
      :placeholder="placeholder || label"
      :option-disabled="() => disabledOptions"
      :options="filteredOptions"
      :option-label="(option) => getOptionLabel(option)"
      :option-value="optionValue"
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
          class="wt-single-select__input"
          :model-value="filterText"
          :size="ComponentSize.SM"
          @update:model-value="filterOptions($event)"
          @keydown.enter.stop="onInputKeydown"
        >
          <template #suffix>
            <wt-icon v-if="allowCustomValues && filterText" icon="select-custom-value-enter" />
            <wt-icon icon="search" />
          </template>
        </wt-input-text>
      </template>
      <template v-if="model" #value="{ value, placeholder }">
        <slot name="value" v-bind="{ value, getOptionLabel, placeholder }">
          <span
            v-tooltip="getOptionLabel(value)"
          >
            {{ getOptionLabel(value) || placeholder }}
          </span>
        </slot>
      </template>
      <template #option="{ option }">
        <slot name="option" v-bind="{ option, getOptionLabel }">
          <span
            class="wt-single-select__option-label"
            v-tooltip="getOptionLabel(option)"
          >
            {{ getOptionLabel(option) }}
          </span>
        </slot>
      </template>
      <template #clearicon>
        <wt-icon-btn 
          v-if="showClear && model"  
          icon="close" 
          @click="clearValue"
        />
      </template>
      <template #dropdownicon>
        <wt-icon :icon="isDropdownOpen ? 'arrow-up' : 'arrow-down'" />
      </template>
      <template #loadingicon>
        <wt-loader :size="ComponentSize.SM" />
      </template>
      <template #footer v-if="showFooterLoader">
        <div class="wt-single-select__footer">
          <wt-loader :size="ComponentSize.SM" />
        </div>
      </template>
    </p-select>
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
import type { SelectProps } from 'primevue';
import { computed, onMounted, toRefs, useSlots, useTemplateRef } from 'vue';
import { ComponentSize, MessageColor, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import { useSelect } from '../_internals/composables/useSelect/useSelect';

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
	labelProps?: object;
	v?: Record<string, unknown>;
	regleValidation?: RegleFieldStatus<string>;
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<Props>(), {
	filterable: true,
	showClear: true,
	options: () => [],
	optionLabel: 'label',
	dataKey: 'id',
	labelProps: () => ({}),
	customValidators: () => [],
});

const model = defineModel<string>({
	default: '',
	get: (value) => {
		if (value == null) return '';
		if (typeof value !== 'object') return value;
		return Object.keys(value).length > 0 ? value : '';
	},
});

const emit = defineEmits<{
	reset: [];
}>();

const selectId = `select-${Math.random().toString(36).slice(2, 11)}`;

const filterInput = useTemplateRef('filterInput');
const selectRef = useTemplateRef('selectRef');

const {
	showFooterLoader,
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
	clearValue,
} = useSelect({
	selected: model,
	options: computed(() => props.options),
	optionLabel: computed(() => props.optionLabel),
	optionValue: computed(() => props.optionValue),
	dataKey: computed(() => props.dataKey),
	allowCustomValues: computed(() => props.allowCustomValues),
	filterInput,
	selectRef,
	searchMethod: computed(() => props.searchMethod),
	selectId: computed(() => selectId),
	isSingle: true,
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
.wt-single-select {
  width: 100%;
  min-width: 0;
}

.wt-single-select__option-label {
  user-select: none;
}

.wt-single-select__input {
  padding: var(--spacing-xs);
}

.wt-single-select__footer {
  position: absolute;
  width: 100%;
  transform: translateY(-100%);
  background: var(--p-select-overlay-background);
  border-bottom-left-radius: var(--p-select-overlay-border-radius);
  border-bottom-right-radius: var(--p-select-overlay-border-radius);
  display: flex;
  justify-content: center;
  padding: var(--spacing-xs) 0;
}
</style>