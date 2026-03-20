import { computed, onMounted } from 'vue';

export const useInputControl = (input) => {
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
	const handleKeyup = (e) => e.stopPropagation();

	return {
		focus,
		handleKeyup,
		removeAutocomplete,
	};
};
