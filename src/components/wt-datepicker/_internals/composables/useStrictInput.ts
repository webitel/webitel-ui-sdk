/**
 * @author @HlukhovYe
 *
 * Enforces strict keyboard input on the PrimeVue DatePicker text field:
 *
 *   - Only digits, '/', ':', and ' ' are allowed through.
 *   - Input is capped at the maximum length for the active format:
 *       dd/mm/yyyy       → 10 characters
 *       dd/mm/yyyy hh:mm → 16 characters
 *
 * Works via a `keydown` handler so the character is blocked before the browser
 * writes it to the input. Control keys and modifier combos always pass through.
 * Listener registration is handled by useDatepicker.
 */
export function createStrictInputHandler(showTime: () => boolean) {
	const MAX_DATE_LENGTH = 10; // dd/mm/yyyy
	const MAX_TIME_LENGTH = 16; // dd/mm/yyyy hh:mm

	const ALLOWED_PRINTABLE = /^[0-9]$/;

	const CONTROL_KEYS = new Set([
		'Backspace',
		'Delete',
		'Tab',
		'Enter',
		'Escape',
		'ArrowLeft',
		'ArrowRight',
		'ArrowUp',
		'ArrowDown',
		'Home',
		'End',
	]);

	function onKeydown(event: KeyboardEvent) {
		if (CONTROL_KEYS.has(event.key)) return;
		if (event.ctrlKey || event.metaKey) return;

		if (!ALLOWED_PRINTABLE.test(event.key)) {
			event.preventDefault();
			return;
		}

		const input = event.target as HTMLInputElement;
		const maxLength = showTime() ? MAX_TIME_LENGTH : MAX_DATE_LENGTH;

		// When text is selected, the typed char replaces the selection —
		// length won't grow beyond current, so no cap needed.
		const selectionLength =
			(input.selectionEnd ?? 0) - (input.selectionStart ?? 0);
		if (selectionLength > 0) return;

		if (input.value.length >= maxLength) {
			event.preventDefault();
		}
	}

	return {
		onKeydown,
	};
}
