import { onMounted, onUnmounted } from 'vue';

/**
 * @author @HlukhovYe
 *
 * https://webitel.atlassian.net/browse/WTEL-9865
 *
 * Prevents PrimeVue's DatePicker from zero-padding a dd/mm segment while the user
 * is mid-typing. Without this, typing "2" into a cleared two-digit slot immediately
 * reformats to "02", forcing the user to delete the leading zero before the second digit.
 *
 * Works by registering two listeners on the same input event:
 * - capture phase (before PrimeVue): snapshots the partial single-digit value
 * - bubble phase (after PrimeVue): if PrimeVue zero-padded the value, restores the
 *   snapshot and cancels further propagation so the model is not updated yet
 */
export function usePreventZeroPad(getInput: () => HTMLInputElement | null) {
	let pendingPartial: {
		value: string;
		cursor: number;
	} | null = null;

	function onInputCapture(event: Event) {
		const input = event.target as HTMLInputElement;
		const raw = input.value;
		const cursor = input.selectionStart ?? 0;
		const parts = raw.split('/');
		let offset = 0;
		for (let i = 0; i < Math.min(parts.length, 2); i++) {
			const seg = parts[i];
			const segEnd = offset + seg.length;
			if (cursor <= segEnd && seg.length === 1 && /^\d$/.test(seg)) {
				pendingPartial = {
					value: raw,
					cursor,
				};
				return;
			}
			offset = segEnd + 1;
		}
	}

	function onInputBubble(event: Event) {
		if (!pendingPartial) return;
		const input = event.target as HTMLInputElement;
		const { value, cursor } = pendingPartial;
		pendingPartial = null;
		if (input.value !== value) {
			input.value = value;
			input.setSelectionRange(cursor, cursor);
			event.stopImmediatePropagation();
		}
	}

	onMounted(() => {
		const input = getInput();
		if (!input) return;
		input.addEventListener('input', onInputCapture, {
			capture: true,
		});
		input.addEventListener('input', onInputBubble);
	});

	onUnmounted(() => {
		const input = getInput();
		if (!input) return;
		input.removeEventListener('input', onInputCapture, {
			capture: true,
		});
		input.removeEventListener('input', onInputBubble);
	});
}
