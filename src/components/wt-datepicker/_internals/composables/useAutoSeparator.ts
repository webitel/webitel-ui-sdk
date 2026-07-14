/**
 * @author @HlukhovYe
 *
 * Automatically inserts date/time separators while the user types into the
 * PrimeVue DatePicker input so they don't have to type '/' or ':' manually.
 *
 * Format without time: dd/mm/yyyy       → inserts '/' after positions 2 and 5
 * Format with time:    dd/mm/yyyy hh:mm → also inserts ' ' after position 10
 *                                          and ':' after position 13
 *
 * The handler runs in the bubble phase (after PrimeVue's own input handler).
 * Listener registration is handled by useDatepicker.
 */
export function createAutoSeparatorHandler(showTime: () => boolean) {
	const DATE_SEPARATORS: Array<{
		afterPos: number;
		sep: string;
	}> = [
		{
			afterPos: 2,
			sep: '/',
		}, // dd → dd/
		{
			afterPos: 5,
			sep: '/',
		}, // mm → mm/
	];

	const TIME_SEPARATORS: Array<{
		afterPos: number;
		sep: string;
	}> = [
		{
			afterPos: 10,
			sep: ' ',
		}, // yyyy → yyyy<space>
		{
			afterPos: 13,
			sep: ':',
		}, // hh → hh:
	];

	let lastLength = 0;
	let injecting = false;

	function onInputBubble(event: Event) {
		if (injecting) return;
		const input = event.target as HTMLInputElement;
		const value = input.value;
		const cursor = input.selectionStart ?? value.length;
		const currentLength = value.length;

		const isDeleting = currentLength < lastLength;
		lastLength = currentLength;
		if (isDeleting) return;

		const separators = showTime()
			? [
					...DATE_SEPARATORS,
					...TIME_SEPARATORS,
				]
			: DATE_SEPARATORS;

		// Find the first separator position the cursor has reached or passed
		// where the separator character is missing. Covers two cases:
		//   1. Normal typing: cursor === afterPos (just finished a segment).
		//   2. Separator was deleted then user typed next digit: cursor > afterPos
		//      but value[afterPos] is a digit instead of the separator.
		for (const { afterPos, sep } of separators) {
			if (cursor < afterPos) break;
			if (value[afterPos] === sep) continue;
			const newValue = value.slice(0, afterPos) + sep + value.slice(afterPos);
			input.value = newValue;
			lastLength = newValue.length;
			const newCursor = cursor + sep.length;
			input.setSelectionRange(newCursor, newCursor);
			injecting = true;
			input.dispatchEvent(
				new Event('input', {
					bubbles: true,
				}),
			);
			injecting = false;
			break;
		}
	}

	function resetLength(input: HTMLInputElement) {
		lastLength = input.value.length;
	}

	return {
		onInputBubble,
		resetLength,
	};
}
