import { computed, nextTick, ref } from 'vue';

/**
 * When the collapsible search bar is expanded and when it collapses back to the
 * magnifier button: it stays expanded while it holds a search or the focus.
 *
 * - Blur collapses it only while it is empty; a whitespace-only value is
 *   cleared on blur, since a blank string is no search.
 * - Escape (in the input) clears the value, collapses it and moves the focus
 *   to the magnifier; so does the reset button, through `collapse`.
 */
export function useCollapsibleSearch({
	getValue,
	getRoot,
	getSearchBar,
	getToggle,
}: {
	getValue: () => string;
	getRoot: () => HTMLElement | null | undefined;
	/** wt-search-bar's exposed api */
	getSearchBar: () => {
		focus: () => void;
		clear: () => void;
	} | null;
	/** the magnifier button */
	getToggle: () => HTMLElement | null | undefined;
}) {
	/**
	 * The user opened the field and the focus has not left it yet
	 */
	const isOpen = ref(false);

	const hasQuery = computed(() => getValue().trim() !== '');

	const isExpanded = computed(() => isOpen.value || hasQuery.value);

	async function expand() {
		isOpen.value = true;
		await nextTick();
		getSearchBar()?.focus();
	}

	async function collapse({ focusToggle = false } = {}) {
		isOpen.value = false;
		if (!focusToggle) return;
		await nextTick();
		getToggle()?.focus();
	}

	function handleFocusout(event: FocusEvent) {
		const nextTarget = event.relatedTarget as Node | null;
		if (nextTarget && getRoot()?.contains(nextTarget)) return;

		/* the magnifier button loses focus when it turns inert on expand */
		if (getToggle()?.contains(event.target as Node)) return;

		if (getValue() && !hasQuery.value) getSearchBar()?.clear();
		collapse();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		if (!(event.target instanceof HTMLInputElement)) return;

		event.preventDefault();
		getSearchBar()?.clear();
		collapse({
			focusToggle: true,
		});
	}

	return {
		isExpanded,
		expand,
		collapse,
		handleFocusout,
		handleKeydown,
	};
}
