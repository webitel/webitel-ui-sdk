import { useSelectOptions } from './useSelectOptions';
import { useSelectDropdown } from './useSelectDropdown';
import { useSelectCustomValues } from './useSelectCustomValues';

export const useSelect = ({
	selected,
	options,
	optionLabel,
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
	};
};
