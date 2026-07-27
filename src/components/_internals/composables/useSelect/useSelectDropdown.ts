import { nextTick, ref, watch } from 'vue';
import type { UseSelectDropdownParams } from './types';

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
}: UseSelectDropdownParams) => {
	const isDropdownOpen = ref(false);
	let overlayResizeObserver: ResizeObserver | null = null;
	let positionRafId: number | null = null;

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
				selectRef.value?.alignOverlay?.();
			});
			overlayResizeObserver.observe(overlay);
		}

		/*
		  @author @HlukhovYe

			https://webitel.atlassian.net/browse/WTEL-9800

		  ResizeObserver only fires when the element's dimensions change, not when it moves.
		  A rAF loop detects position changes (e.g. modal resize, parent reflow) and realigns
		  the overlay accordingly. Cancelled on dropdown hide to avoid leaking frames.
		*/
		const triggerEl = selectRef?.value?.$el;
		if (triggerEl) {
			let lastTop = triggerEl.getBoundingClientRect().top;
			let lastLeft = triggerEl.getBoundingClientRect().left;
			const poll = () => {
				const rect = triggerEl.getBoundingClientRect();
				if (rect.top !== lastTop || rect.left !== lastLeft) {
					lastTop = rect.top;
					lastLeft = rect.left;
					selectRef.value?.alignOverlay?.();
				}
				positionRafId = requestAnimationFrame(poll);
			};
			positionRafId = requestAnimationFrame(poll);
		}
	};

	/*
	  @author @HlukhovYe

		https://webitel.atlassian.net/browse/WTEL-9798

	  Scroll the list to top after filtering. A plain nextTick() after filterOptions() is not
	  enough when searchMethod is used — filteredOptions only updates after the async fetch
	  resolves. The flag ensures the scroll fires on the first filteredOptions change after a
	  search input, but not on subsequent changes (e.g. infinite-scroll page appends).
	*/
	let scrollOnNextOptionsUpdate = false;

	watch(filteredOptions, () => {
		if (!scrollOnNextOptionsUpdate) return;
		scrollOnNextOptionsUpdate = false;
		nextTick(() => getListContainer()?.scrollTo(0, 0));
	});

	const filterOptionsAndScrollToTop = (value: string) => {
		scrollOnNextOptionsUpdate = true;
		filterOptions(value);
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
		if (positionRafId !== null) {
			cancelAnimationFrame(positionRafId);
			positionRafId = null;
		}
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
		filterOptionsAndScrollToTop,
	};
};
