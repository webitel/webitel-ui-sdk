import { useI18n } from 'vue-i18n';
import { onMounted, reactive, ref } from 'vue';
import deepEqual from 'deep-equal';
import uniqWith from 'lodash/uniqWith.js';
import debounce from '../../scripts/debounce.js';

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
	const isDropdownOpen = ref(false);
	let overlayResizeObserver: ResizeObserver | null = null;

	const getListContainer = () => {
		return document.querySelector(`#${selectId.value}_list`)
			?.parentElement as HTMLElement | null;
	};

	const handleScroll = (e: Event) => {
		const el = e.target as HTMLElement;
		const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
		if (nearBottom && !isLoading.value && searchHasNext.value) {
			fetchOptions();
		}
	};

	// selected options first, then other options
	// selected values that are not in the list are prepended as-is
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
				: selectedAsArray.some((s) => deepEqual(s, option));
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

	const onDropdownBeforeShow = () => {
		isDropdownOpen.value = true;
		// when user previously selected items, they should be on top only after reopening dropdown
		filteredOptions.value = sortOptions(filteredOptions.value);
	};

	const onDropdownShow = () => {
		filterInput.value?.focus();
		if (searchMethod.value) {
			getListContainer()?.addEventListener('scroll', handleScroll);
		}
		/* 
        primevue doesnt align overlay position if use custom options filtering,
        so its necessary to trigger primevue's method alignOverlay manually
    */
		const overlay = selectRef?.value?.overlay;
		if (overlay) {
			overlayResizeObserver = new ResizeObserver(() => {
				selectRef.value?.alignOverlay();
			});
			overlayResizeObserver.observe(overlay);
		}
	};

	const onDropdownBeforeHide = () => {
		getListContainer()?.scrollTo(0, 0); // scroll dropdown list to top
	};

	const onDropdownHide = () => {
		isDropdownOpen.value = false;
		overlayResizeObserver?.disconnect();
		overlayResizeObserver = null;
		if (searchMethod.value) {
			getListContainer()?.removeEventListener('scroll', handleScroll);
			if (filterText.value) resetAndFetch();
		}
		filterText.value = '';
	};

	const resetAndFetch = (search = '') => {
		searchParams.search = search;
		searchParams.page = 1;
		fetchOptions();
	};

	const makeCustomValue = (text: string) => {
		const sample = options.value[0];
		if (sample && typeof sample === 'object') {
			return Object.fromEntries(
				Object.keys(sample).map((key) => [
					key,
					text,
				]),
			);
		}
		return text;
	};

	const onInputKeydown = () => {
		if (!allowCustomValues.value) return;
		if (isSingle) {
			const customValue = makeCustomValue(filterText.value);
			selectRef.value?.hide();
			options.value.unshift(customValue);
			selected.value = customValue;
			filterText.value = '';
			filterOptions('');
		} else {
			// TODO: logic for multiselect
		}
	};

	const clearValue = (e) => {
		e.stopPropagation();
		selected.value = null;
	};

	onMounted(() => {
		if (searchMethod.value) fetchOptions();
	});

	return {
		isLoading,
		isDropdownOpen,
		filterText,
		filteredOptions,
		getOptionLabel,
		filterOptions,
		onDropdownBeforeShow,
		onDropdownBeforeHide,
		onDropdownShow,
		onDropdownHide,
		onInputKeydown,
		clearValue,
	};
};
