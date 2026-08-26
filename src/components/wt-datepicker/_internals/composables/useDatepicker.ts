import { onMounted, onUnmounted } from 'vue';
import { createAutoSeparatorHandler } from './useAutoSeparator';
import { useCloseOnAnchorHidden } from './useCloseOnAnchorHidden';
import { useOverlayAnchor } from './useOverlayAnchor';
import { createPreventZeroPadHandlers } from './usePreventZeroPad';
import { useRestoreOnBlur } from './useRestoreOnBlur';
import { createStrictInputHandler } from './useStrictInput';

/**
 * @author @HlukhovYe
 *
 * Single composable entry point for wt-datepicker. Composes all input-handling
 * and overlay logic into a minimal set of DOM listeners — one capture input,
 * one bubble input, one keydown — so the browser dispatches each event once.
 *
 * Returns:
 *   onBlur      — forward to p-datepicker's @blur
 *   lockOverlay / unlockOverlay — forward to onPanelShow / onPanelHide
 */
export function useDatepicker(
	getInput: () => HTMLInputElement | null,
	getDatepicker: () => {
		rawValue: Date | null;
		updateModel: (v: Date) => void;
		overlayVisible?: boolean;
	} | null,
	showTime: () => boolean,
	isClearable: () => boolean,
) {
	const { onInputCapture: zeroPadCapture, onInputBubble: zeroPadBubble } =
		createPreventZeroPadHandlers();

	const { onInputBubble: separatorBubble, resetLength } =
		createAutoSeparatorHandler(showTime);

	const { onKeydown } = createStrictInputHandler(showTime);

	const { lock: lockOverlayAnchor, unlock: unlockOverlayAnchor } =
		useOverlayAnchor();

	const { watch: watchAnchorVisibility, unwatch: unwatchAnchorVisibility } =
		useCloseOnAnchorHidden(getInput, getDatepicker);

	const { onBlur } = useRestoreOnBlur(getDatepicker, isClearable);

	function lockOverlay(panel: HTMLElement) {
		lockOverlayAnchor(panel);
		watchAnchorVisibility();
	}

	function unlockOverlay() {
		unlockOverlayAnchor();
		unwatchAnchorVisibility();
	}

	function onInputCaptureHandler(event: Event) {
		zeroPadCapture(event);
	}

	function onInputBubbleHandler(event: Event) {
		// Zero-pad handler runs first: it may stop propagation if it restores a
		// partial value, which also prevents the separator handler from seeing a
		// half-formed string and injecting a separator too early.
		zeroPadBubble(event);
		separatorBubble(event);
	}

	onMounted(() => {
		const input = getInput();
		if (!input) return;
		resetLength(input);
		input.addEventListener('input', onInputCaptureHandler, {
			capture: true,
		});
		input.addEventListener('input', onInputBubbleHandler);
		input.addEventListener('keydown', onKeydown);
	});

	onUnmounted(() => {
		const input = getInput();
		if (!input) return;
		input.removeEventListener('input', onInputCaptureHandler, {
			capture: true,
		});
		input.removeEventListener('input', onInputBubbleHandler);
		input.removeEventListener('keydown', onKeydown);
	});

	return {
		onBlur,
		lockOverlay,
		unlockOverlay,
	};
}
