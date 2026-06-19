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
	manualCustomValues = false,
	filterInput,
	selectRef,
	searchMethod,
	selectId,
	isSingle,
	emit = () => {},
}) => {
	const {
		filterText,
		filteredOptions,
		isLoading,
		searchHasNext,
		sortOptions,
		getOptionLabel,
		fetchOptions,
		resetAndFetch,
		filterOptions,
		updateSelectedOptionsCache,
	} = useSelectOptions({
		selected,
		options,
		optionLabel,
		optionValue,
		dataKey,
		allowCustomValues,
		searchMethod,
	});

	const {
		isDropdownOpen,
		onDropdownBeforeShow,
		onDropdownBeforeHide,
		onDropdownShow,
		onDropdownHide,
	} = useSelectDropdown({
		selectId,
		selectRef,
		filterInput,
		searchMethod,
		filteredOptions,
		filterText,
		filterOptions,
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
		filterOptions,
		updateSelectedOptionsCache,
		selectRef,
		allowCustomValues,
		manualCustomValues,
		isSingle,
		emit,
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
		filterOptions,
		onDropdownBeforeShow,
		onDropdownBeforeHide,
		onDropdownShow,
		onDropdownHide,
		onInputKeydown,
		clearValue,
	};
};
