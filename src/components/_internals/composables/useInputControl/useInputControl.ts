import { computed, type Ref } from 'vue';

import type { PrimevueInstance } from '../../types/PrimevueInstance';

export const useInputControl = (input: Ref<PrimevueInstance | undefined>) => {
	// inputnumber has span wrapper while inputtext hasnt
	const inputEl = computed(() => {
		if (input.value?.$el instanceof HTMLInputElement) {
			return input.value?.$el;
		} else {
			return input.value?.$el?.querySelector('input');
		}
	});

	const focus = () => {
		inputEl.value?.focus();
	};

	const removeAutocomplete = () => {
		inputEl.value?.setAttribute('autocomplete', 'off');
	};

	// prevent double triggering
	const handleKeyup = (e: Event) => e.stopPropagation();

	return {
		focus,
		handleKeyup,
		removeAutocomplete,
	};
};
