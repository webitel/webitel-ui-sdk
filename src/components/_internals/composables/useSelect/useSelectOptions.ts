import { useI18n } from 'vue-i18n';
import { reactive, ref, watch } from 'vue';
import deepEqual from 'deep-equal';
import uniqWith from 'lodash/uniqWith';
import debounce from '../../../../scripts/debounce';
import { toArray, isOptionSelected } from './useSelectUtils';

export const useSelectOptions = ({
	selected,
	options,
	optionLabel,
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
		const deduped = uniqWith(opts, deepEqual);
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
		// https://webitel.atlassian.net/browse/WTEL-3181
		// if allowCustomValue select mode, return label as is
		if (allowCustomValues.value && option.isTag) return option.label;

		if (optionLabel && option[optionLabel]) return option[optionLabel];
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
		const mergedOptions = uniqWith(
			[
				...selectedOptionsCache.value,
				...foundOptions,
			],
			deepEqual,
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
				? uniqWith(
						[
							...selectedOptionsCache.value,
							...items,
						],
						deepEqual,
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
				uniqWith(
					[
						...selectedOptionsCache.value,
						...matchingOptions,
					],
					deepEqual,
				),
			);
		} else {
			debouncedFetch(value);
		}
	};

	watch(() => selected.value, updateSelectedOptionsCache, {
		deep: true,
	});

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
