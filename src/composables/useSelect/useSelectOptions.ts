import { useI18n } from 'vue-i18n';
import { reactive, ref } from 'vue';
import deepEqual from 'deep-equal';
import uniqWith from 'lodash/uniqWith';
import debounce from '../../scripts/debounce';

export const useSelectOptions = ({
	selected,
	options,
	optionLabel,
	optionValue,
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

		const selectedAsArray = Array.isArray(selected.value)
			? selected.value
			: [
					selected.value,
				];

		const selectedOptions = [];
		const otherOptions = [];

		for (const option of deduped) {
			const isSelected = optionValue.value
				? selectedAsArray.includes(option[optionValue.value])
				: selectedAsArray.some((s) => s === option);
			(isSelected ? selectedOptions : otherOptions).push(option);
		}

		const topOptions =
			optionValue.value || selectedOptions.length
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

	const fetchOptions = async () => {
		if (!searchMethod.value) return;
		const { search, page } = searchParams;
		isLoading.value = true;
		const { items, next } = await searchMethod.value({
			search,
			page,
		});
		filteredOptions.value = sortOptions(
			searchParams.page === 1 ? items : filteredOptions.value.concat(items),
		);
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
			filteredOptions.value = sortOptions(
				options.value.filter((option) => {
					return getOptionLabel(option)
						.toLowerCase()
						.includes(value.toLowerCase());
				}),
			);
		} else {
			debouncedFetch(value);
		}
	};

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
	};
};
