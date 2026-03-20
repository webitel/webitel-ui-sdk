import { useSelectOptions } from './useSelectOptions';
import { useSelectDropdown } from './useSelectDropdown';
import { useSelectCustomValues } from './useSelectCustomValues';

export const useSelect = ({
	selected,
	options,
	optionLabel,
	optionValue,
	allowCustomValues,
	filterInput,
	selectRef,
	searchMethod,
	selectId,
	isSingle,
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
	} = useSelectOptions({
		selected,
		options,
		optionLabel,
		optionValue,
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
		resetAndFetch,
		sortOptions,
		fetchOptions,
		isLoading,
		searchHasNext,
	});

	const { onInputKeydown, clearValue } = useSelectCustomValues({
		selected,
		options,
		filterText,
		filterOptions,
		selectRef,
		allowCustomValues,
		isSingle,
	});

	return {
		isLoading,
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
