import { ref } from 'vue';

export const useSelectDropdown = ({
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
}) => {
	const isDropdownOpen = ref(false);
	let overlayResizeObserver: ResizeObserver | null = null;

	const getListContainer = (): HTMLElement | null => {
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

	const onDropdownBeforeShow = () => {
		isDropdownOpen.value = true;
		// @author @HlukhovYe
		// when user previously selected items, they should be on top only after reopening dropdown
		filteredOptions.value = sortOptions(filteredOptions.value);
	};

	const onDropdownShow = () => {
		filterInput.value?.focus();
		if (searchMethod.value) {
			getListContainer()?.addEventListener('scroll', handleScroll);
		}
		/*
		  @author @HlukhovYe
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
		/**
		 * @author @HlukhovYe
		 * neccessary fix for this problem: https://github.com/primefaces/primevue/issues/8508
		 */
		const overlay = selectRef?.value?.overlay;
		if (overlay) overlay.style.pointerEvents = 'none';
		getListContainer()?.scrollTo(0, 0); // scroll dropdown list to top
	};

	const onDropdownHide = () => {
		isDropdownOpen.value = false;
		overlayResizeObserver?.disconnect();
		overlayResizeObserver = null;
		if (searchMethod.value) {
			/*
			  @author @HlukhovYe
			  remove scroll listener on dropdown close, no need to remove it on unmount
			*/
			getListContainer()?.removeEventListener('scroll', handleScroll);
			if (filterText.value) resetAndFetch();
		} else {
			filterOptions('');
		}
		filterText.value = '';
	};

	return {
		isDropdownOpen,
		onDropdownBeforeShow,
		onDropdownBeforeHide,
		onDropdownShow,
		onDropdownHide,
	};
};
