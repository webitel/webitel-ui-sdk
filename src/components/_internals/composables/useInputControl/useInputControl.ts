import { computed, type Ref } from 'vue';

/** PrimeVue input component instance wrapping the native element. */
interface InputComponentRef {
	$el?: HTMLElement;
}

export const useInputControl = (input: Ref<InputComponentRef | undefined>) => {
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
