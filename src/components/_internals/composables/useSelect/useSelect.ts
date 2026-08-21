import { onMounted } from 'vue';
import type { UseSelectParams } from './types';
import { useSelectCustomValues } from './useSelectCustomValues';
import { useSelectDropdown } from './useSelectDropdown';
import { useSelectLoader } from './useSelectLoader';
import { useSelectOptions } from './useSelectOptions';

export const useSelect = ({
	selected,
	options,
	optionLabel,
	optionValue,
	dataKey,
	allowCustomValues,
	// accepted for API compatibility; custom-value manual handling is currently disabled
	manualCustomValues: _manualCustomValues = false,
	filterInput,
	selectRef,
	searchMethod,
	selectId,
	isSingle,
	strictApiOptions = undefined,
	// biome-ignore lint/suspicious/noExplicitAny: receives the component's typed emit
	emit = (_event: any, ..._args: any[]) => {},
}: UseSelectParams) => {
	const {
		filterText,
		filteredOptions,
		isLoading,
		searchHasNext,
		sortOptions,
		getOptionLabel,
		fetchOptions,
		fetchSelectedByIds,
		resetAndFetch,
		filterOptionsBase,
		updateSelectedOptionsCache,
	} = useSelectOptions({
		selected,
		options,
		optionLabel,
		optionValue,
		dataKey,
		allowCustomValues,
		searchMethod,
		strictApiOptions,
	});

	const {
		isDropdownOpen,
		onDropdownBeforeShow,
		onDropdownBeforeHide,
		onDropdownShow,
		onDropdownHide,
		filterOptionsAndScrollToTop,
	} = useSelectDropdown({
		selectId,
		selectRef,
		filterInput,
		searchMethod,
		filteredOptions,
		filterText,
		filterOptions: filterOptionsBase,
		resetAndFetch,
		sortOptions,
		fetchOptions,
		isLoading,
		searchHasNext,
	});

	const { showFooterLoader } = useSelectLoader(isLoading);

	const { onInputKeydown } = useSelectCustomValues({
		selected,
		filteredOptions,
		options,
		dataKey,
		filterText,
		filterOptions: filterOptionsAndScrollToTop,
		updateSelectedOptionsCache,
		selectRef,
		allowCustomValues,
		isSingle,
	});

	onMounted(async () => {
		await fetchSelectedByIds();
		if (!searchMethod.value) return;
		fetchOptions();
	});

	const clearValue = () => {
		let value: string | unknown[] | Record<string, unknown> = '';
		if (Array.isArray(selected.value)) value = [];
		else if (typeof selected.value === 'object' && selected.value !== null)
			value = {};
		selected.value = value;
		emit('reset', value);
	};

	return {
		isLoading,
		showFooterLoader,
		isDropdownOpen,
		filterText,
		filteredOptions,
		getOptionLabel,
		fetchOptions,
		filterOptions: filterOptionsAndScrollToTop,
		onDropdownBeforeShow,
		onDropdownBeforeHide,
		onDropdownShow,
		onDropdownHide,
		onInputKeydown,
		clearValue,
	};
};
