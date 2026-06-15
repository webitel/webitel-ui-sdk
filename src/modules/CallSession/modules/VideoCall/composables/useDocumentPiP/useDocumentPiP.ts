import { computed, onBeforeUnmount, ref } from 'vue';

import type { DocumentPiPWindow, MediaSnapshot } from '../../types/types';

import { bridgeCustomElements } from './bridgeCustomElements';
import { copyStyles } from './copyStyles';
import { collectMedia, safePlay } from './mediaCollection';
import { resumePlayback } from './mediaPlayback';
import { restoreMedia, restoreStreams, snapshotMedia } from './mediaSnapshot';
import { createPlaybackRetry } from './playbackRetry';
import { usePiPResizeObserver } from './usePiPResizeObserver';

export function useDocumentPiP(
	getElement: () => HTMLElement | null | undefined,
) {
	const isPiP = ref(false);
	const isSupported = computed(() => 'documentPictureInPicture' in window);

	let pipWindow: Window | null = null;
	let movedEl: HTMLElement | null = null;
	let originalParent: Node | null = null;
	let originalNextSibling: Node | null = null;

	/**
	 * @author @Oleksandr Palonnyi
	 *
	 * [WTEL-9774](https://webitel.atlassian.net/browse/WTEL-9774)
	 *
	 * True while `api.requestWindow()` is in flight.
	 * Prevents a second `enterPiP` from starting while the first async
	 * request is still pending.
	 */
	let isRequestWindowPending = false;

	const mediaSnapshot: MediaSnapshot[] = [];
	const { retryPlayback, stopPlaybackRetry } =
		createPlaybackRetry(mediaSnapshot);

	const { startPiPResizeObserver, stopPiPResizeObserver, onPiPResize } =
		usePiPResizeObserver();

	const armFirstGestureResume = (w?: Window) => {
		const target = w ?? pipWindow;
		if (!target || target.closed) return;

		const kick = () => {
			if (movedEl) resumePlayback(movedEl, mediaSnapshot);
			target.document.removeEventListener('pointerdown', kick, true);
			target.document.removeEventListener('keydown', kick, true);
		};
		target.document.addEventListener('pointerdown', kick, true);
		target.document.addEventListener('keydown', kick, true);
	};

	const restoreElement = () => {
		if (!movedEl) {
			mediaSnapshot.splice(0);
			return;
		}

		if (originalParent) {
			originalParent.appendChild(movedEl);
		}

		restoreMedia(mediaSnapshot);
		resumePlayback(movedEl, mediaSnapshot);

		movedEl = null;
	};

	const onPiPWindowClose = () => {
		stopPlaybackRetry();
		stopPiPResizeObserver();
		restoreElement();
		pipWindow = null;
		isPiP.value = false;
	};

	const enterPiP = async (width = 480, height = 320) => {
		if (!isSupported.value || isPiP.value || isRequestWindowPending) return;

		const el = getElement();
		if (!el) return;

		/**
		 * @author @Oleksandr Palonnyi
		 *
		 * [WTEL-9774](https://webitel.atlassian.net/browse/WTEL-9774)
		 *
		 * If the element is stranded inside a closed Document PiP window (e.g. when
		 * the consuming app renders the component into a PiP context), rescue it back
		 * to the main document before proceeding. Using `document.body` as a temporary
		 * parent is safe: the element is `position:fixed` so its visual position is
		 * viewport-relative regardless of where it sits in the DOM tree, and Vue will
		 * remove it from `document.body` when the component eventually unmounts.
		 */
		if (el.ownerDocument !== document) {
			document.body.appendChild(el);
		}

		if (!originalParent) {
			originalParent = el.parentNode;
			originalNextSibling = el.nextSibling;
		}

		const api = (window as DocumentPiPWindow).documentPictureInPicture;
		let win: Window;

		isRequestWindowPending = true;
		try {
			win = await api.requestWindow({
				width,
				height,
			});
		} catch {
			return;
		} finally {
			isRequestWindowPending = false;
		}

		/**
		 * @author @Oleksandr Palonnyi
		 *
		 * [WTEL-9774](https://webitel.atlassian.net/browse/WTEL-9774)
		 *
		 * `onBeforeUnmount` can fire while `requestWindow` is awaited above,
		 * clearing `originalParent`. Abort if that happened so we don't open a
		 * PiP window that can never restore its element.
		 */
		if (!originalParent) {
			win.close();
			return;
		}

		pipWindow = win;

		copyStyles(win);
		win.document.body.style.cssText =
			'margin:0;overflow:hidden;width:100%;height:100%;';
		bridgeCustomElements(el, win);

		movedEl = el;
		snapshotMedia(el, mediaSnapshot);
		win.document.body.appendChild(el);

		restoreStreams(mediaSnapshot);
		collectMedia(el).forEach(safePlay);

		retryPlayback(el);
		armFirstGestureResume(win);

		isPiP.value = true;
		win.addEventListener('pagehide', onPiPWindowClose);
		startPiPResizeObserver(el);
	};

	const exitPiP = () => {
		if (!isPiP.value) return;

		stopPlaybackRetry();
		stopPiPResizeObserver();
		restoreElement();

		if (pipWindow && !pipWindow.closed) {
			pipWindow.removeEventListener('pagehide', onPiPWindowClose);
			pipWindow.close();
		}

		pipWindow = null;
		isPiP.value = false;
	};

	onBeforeUnmount(() => {
		isRequestWindowPending = false;
		if (isPiP.value) exitPiP();
		originalParent = null;
		originalNextSibling = null;
	});

	return {
		isPiP,
		isSupported,
		enterPiP,
		exitPiP,
		armFirstGestureResume,
		onPiPResize,
	};
}
