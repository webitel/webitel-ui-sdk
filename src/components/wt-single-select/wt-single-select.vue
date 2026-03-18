<template>
  <div class="wt-select">
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
      auto-option-focus
      input-class="typo-body-1"
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
import { computed, toRefs, useSlots, useTemplateRef } from 'vue';
import type { SelectProps } from 'primevue';
import { ComponentSize, MessageColor, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';
import { useSelect } from '../../composables/useSelect/useSelect';

interface Props extends SelectProps {
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	disabledOptions?: boolean;
	filterable?: boolean;
	hasLabel?: boolean;
	showClear?: boolean;
	options?: unknown[];
	optionLabel?: string;
	optionValue?: string;
	searchMethod?: () => void;
	allowCustomValues?: boolean;
	labelProps?: object;
	v?: Record<string, unknown>;
	regleValidation?: RegleFieldStatus<string>;
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<Props>(), {
	label: '',
	placeholder: '',
	required: false,
	disabled: false,
	disabledOptions: false, // true disables all options but shows dropdown
	filterable: true, // false disables options search
	hasLabel: true,
	showClear: false, // false hides clear button
	options: () => [],
	optionLabel: 'label',
	optionValue: '',
	searchMethod: null, // function that returns filtered options
	allowCustomValues: false, // true allows adding custom values through input
	labelProps: () => ({}),
	v: null,
	regleValidation: null,
	customValidators: () => [],
});

const model = defineModel<string>({
	default: '',
});

const selectId = `select-${Math.random().toString(36).slice(2, 11)}`;

const filterInput = useTemplateRef('filterInput');
const selectRef = useTemplateRef('selectRef');

const {
	isLoading,
	isDropdownOpen,
	filterText,
	filteredOptions,
	getOptionLabel,
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
	allowCustomValues: computed(() => props.allowCustomValues),
	filterInput,
	selectRef,
	searchMethod: computed(() => props.searchMethod),
	selectId: computed(() => selectId),
	isSingle: true,
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
</script>
