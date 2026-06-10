import { reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import debounce from '../../../../scripts/debounce';
import { dedupeByKey, isOptionSelected, toArray } from './useSelectUtils';

export const useSelectOptions = ({
	selected,
	options,
	optionLabel,
	optionValue,
	dataKey,
	allowCustomValues,
	searchMethod,
}) => {
	const { t } = useI18n();
	const defaultOptionLabel = 'name';
	const filterText = ref('');
	const filteredOptions = ref(options.value);
	const isLoading = ref(false);
	const searchHasNext = ref(true);
	const searchParams = reactive({
		page: 1,
		search: '',
	});

	/*
	  @author @HlukhovYe
	  selected options first, then other options
	  selected values that are not in the list are prepended as-is
	*/
	const sortOptions = (opts) => {
		const deduped = dedupeByKey(opts, dataKey.value);
		if (!selected.value) return deduped;

		const selectedAsArray = toArray(selected.value);

		const selectedOptions = [];
		const otherOptions = [];

		for (const option of deduped) {
			const isSelected = isOptionSelected(
				option,
				selectedAsArray,
				dataKey.value,
			);
			(isSelected ? selectedOptions : otherOptions).push(option);
		}

		const topOptions =
			dataKey.value || selectedOptions.length
				? selectedOptions
				: selectedAsArray;
		return topOptions.concat(otherOptions);
	};

	const getOptionLabel = (option) => {
		if (!option) return '';
		// https://webitel.atlassian.net/browse/WTEL-3181
		// if allowCustomValue select mode, return label as is
		if (allowCustomValues.value && option.isTag) return option.label;

		// when optionValue is used PrimeVue passes the extracted primitive instead of the full object
		if (optionValue?.value && typeof option !== 'object') {
			const foundOption = (
				filteredOptions.value as Record<string, unknown>[]
			).find((o) => o[optionValue.value] === option);
			return foundOption ? getOptionLabel(foundOption) : String(option);
		}

		if (optionLabel.value && option[optionLabel.value])
			return option[optionLabel.value];
		if (option.locale) {
			if (Array.isArray(option.locale)) return t(...option.locale);
			return t(option.locale);
		}
		return option[defaultOptionLabel] || option;
	};

	// Cache of full option objects for currently selected values,
	// so they can be preserved in filteredOptions after filtering
	const selectedOptionsCache = ref([]);

	const updateSelectedOptionsCache = () => {
		if (!selected.value) {
			selectedOptionsCache.value = [];
			return;
		}
		const selectedAsArray = toArray(selected.value);
		const isSelected = (option) =>
			isOptionSelected(option, selectedAsArray, dataKey.value);

		// Find full option objects from filteredOptions that match selected values
		const foundOptions = filteredOptions.value.filter(isSelected);
		// Merge with previous cache, then remove entries no longer selected
		const mergedOptions = dedupeByKey(
			[
				...selectedOptionsCache.value,
				...foundOptions,
			],
			dataKey.value,
		);
		selectedOptionsCache.value = mergedOptions.filter(isSelected);
	};

	const fetchOptions = async () => {
		if (!searchMethod.value) return;
		const { search, page } = searchParams;
		isLoading.value = true;
		const { items, next } = await searchMethod.value({
			search,
			page,
		});
		const baseOptions =
			searchParams.page === 1
				? dedupeByKey(
						[
							...toArray(selected.value).filter(Boolean),
							...selectedOptionsCache.value,
							...items,
						],
						dataKey.value,
					)
				: filteredOptions.value.concat(items);
		filteredOptions.value = sortOptions(baseOptions);
		searchHasNext.value = next;
		searchParams.page += 1;
		isLoading.value = false;
	};

	const resetAndFetch = (search = '') => {
		searchParams.search = search;
		searchParams.page = 1;
		fetchOptions();
	};

	const debouncedFetch = debounce((value) => resetAndFetch(value));

	const filterOptions = (value) => {
		filterText.value = value;
		if (!searchMethod.value) {
			const matchingOptions = options.value.filter((option) =>
				getOptionLabel(option).toLowerCase().includes(value.toLowerCase()),
			);
			filteredOptions.value = sortOptions(
				dedupeByKey(
					[
						...selectedOptionsCache.value,
						...matchingOptions,
					],
					dataKey.value,
				),
			);
		} else {
			debouncedFetch(value);
		}
	};

	const addSelectedValueToList = (newVal) => {
		// If the selected value is not in the list, add it
		if (!newVal || !searchMethod.value) return;
		const selectedAsArray = toArray(newVal);
		const missingSelected = selectedAsArray.filter(
			(s) => !isOptionSelected(s, filteredOptions.value, dataKey.value),
		);
		if (missingSelected.length) {
			filteredOptions.value = sortOptions(
				dedupeByKey(
					[
						...missingSelected,
						...filteredOptions.value,
					],
					dataKey.value,
				),
			);
		}
	};

	watch(
		() => selected.value,
		(newVal) => {
			updateSelectedOptionsCache();
			addSelectedValueToList(newVal);
		},
	);

	watch(
		() => options.value,
		(newOptions) => {
			if (!searchMethod.value) {
				filteredOptions.value = sortOptions(newOptions);
			}
		},
	);

	return {
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
	};
};
