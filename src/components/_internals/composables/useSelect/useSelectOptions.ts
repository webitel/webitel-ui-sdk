import { reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import debounce from '../../../../scripts/debounce';
import type {
	SelectOption,
	SelectValue,
	UseSelectOptionsParams,
} from './types';
import {
	dedupeByKey,
	filterOptionsBySearchValue,
	isOptionSelected,
	toArray,
} from './useSelectUtils';

export const useSelectOptions = ({
	selected,
	options,
	optionLabel,
	optionValue,
	dataKey,
	allowCustomValues,
	searchMethod,
	strictApiOptions,
}: UseSelectOptionsParams) => {
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
	const sortOptions = (opts: SelectOption[]): SelectOption[] => {
		const deduped = dedupeByKey(opts, dataKey.value);
		if (!selected.value) return deduped;

		const selectedAsArray = toArray(selected.value);

		const selectedOptions: SelectOption[] = [];
		const otherOptions: SelectOption[] = [];

		for (const option of deduped) {
			const isSelected = isOptionSelected(
				option,
				selectedAsArray,
				dataKey.value,
			);
			(isSelected ? selectedOptions : otherOptions).push(option);
		}

		return selectedOptions.concat(otherOptions);
	};

	const getOptionLabel = (option: SelectOption): string => {
		if (option === null || option === undefined) return '';
		// https://webitel.atlassian.net/browse/WTEL-3181
		// if allowCustomValue select mode, return label as is
		if (allowCustomValues.value && option.isTag) return option.label;

		// when optionValue is used PrimeVue passes the extracted primitive instead of the full object
		const optionValueKey = optionValue?.value;
		if (optionValueKey && typeof option !== 'object') {
			const foundOption = (
				[
					...filteredOptions.value,
					...selectedOptionsCache.value,
				] as Record<string, unknown>[]
			).find((o) => o[optionValueKey] === option);
			return foundOption ? getOptionLabel(foundOption) : String(option);
		}

		if (optionLabel.value && option[optionLabel.value])
			return option[optionLabel.value];
		if (option.locale) {
			if (Array.isArray(option.locale))
				return t(
					...(option.locale as [
						string,
					]),
				);
			return t(option.locale);
		}
		return option[defaultOptionLabel] || option;
	};

	const filterBySearch = (opts: SelectOption[], value: string) =>
		filterOptionsBySearchValue(opts, value, getOptionLabel);

	// Cache of full option objects for currently selected values,
	// so they can be preserved in filteredOptions after filtering
	const selectedOptionsCache = ref<SelectOption[]>([]);

	const updateSelectedOptionsCache = () => {
		if (!selected.value) {
			selectedOptionsCache.value = [];
			return;
		}
		const selectedAsArray = toArray(selected.value);
		const isSelected = (option: SelectOption) =>
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

	const fetchSelectedByIds = async () => {
		if (!searchMethod.value || !optionValue?.value || !selected.value) return;
		const ids = toArray(selected.value);
		if (!ids.length) return;
		isLoading.value = true;
		const { items } = await searchMethod.value({
			[dataKey.value]: ids,
			size: ids.length,
		});
		selectedOptionsCache.value = dedupeByKey(
			[
				...selectedOptionsCache.value,
				...items,
			],
			dataKey.value,
		);
		isLoading.value = false;
	};

	const fetchOptions = async () => {
		if (!searchMethod.value) return;
		const { search, page } = searchParams;
		isLoading.value = true;
		const { items, next } = await searchMethod.value({
			search,
			page,
		});
		const matchingCached = search
			? filterBySearch(selectedOptionsCache.value, search)
			: selectedOptionsCache.value;
		const baseOptions =
			searchParams.page === 1
				? dedupeByKey(
						[
							...matchingCached,
							...items,
						],
						dataKey.value,
					)
				: filteredOptions.value.concat(items);
		filteredOptions.value = sortOptions(baseOptions);
		addSelectedValueToList(selected.value);
		searchHasNext.value = next ?? false;
		searchParams.page += 1;
		isLoading.value = false;
	};

	const resetAndFetch = (search = '') => {
		searchParams.search = search;
		searchParams.page = 1;
		fetchOptions();
	};

	const debouncedFetch = debounce((value: string) => resetAndFetch(value));

	const filterOptionsBase = (value: string) => {
		filterText.value = value;
		if (!searchMethod.value) {
			const matchingCached = filterBySearch(selectedOptionsCache.value, value);
			const matchingOptions = filterBySearch(options.value, value);
			filteredOptions.value = sortOptions(
				dedupeByKey(
					[
						...matchingCached,
						...matchingOptions,
					],
					dataKey.value,
				),
			);
		} else {
			debouncedFetch(value);
		}
	};

	const addSelectedValueToList = (newVal: SelectValue) => {
		// If the selected value is not in the list, add it
		if (!newVal || !searchMethod.value || strictApiOptions?.value) return;
		const selectedAsArray = toArray(newVal);
		const missingSelected = selectedAsArray.filter(
			(s) => !isOptionSelected(s, filteredOptions.value, dataKey.value),
		);
		if (missingSelected.length) {
			// resolve primitives to full objects from cache so PrimeVue can checkmark them
			const resolved = missingSelected.map(
				(s) =>
					(selectedOptionsCache.value as Record<string, unknown>[]).find(
						(o) => o[dataKey.value] === s,
					) ?? s,
			);
			filteredOptions.value = sortOptions(
				dedupeByKey(
					[
						...filterBySearch(resolved, filterText.value),
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
		fetchSelectedByIds,
		resetAndFetch,
		filterOptionsBase,
		updateSelectedOptionsCache,
	};
};
