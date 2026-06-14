import {
	computed,
	type MaybeRefOrGetter,
	onBeforeUnmount,
	ref,
	toValue,
} from 'vue';

import type { DocumentPiPWindow, MediaSnapshot } from '../../types/types';

import { bridgeCustomElements } from './bridgeCustomElements';
import { copyStyles } from './copyStyles';
import { collectMedia, safePlay } from './mediaCollection';
import { resumePlayback } from './mediaPlayback';
import { restoreMedia, restoreStreams, snapshotMedia } from './mediaSnapshot';
import { createPlaybackRetry } from './playbackRetry';
import { usePiPResizeObserver } from './usePiPResizeObserver';

interface UseDocumentPiPOptions {
	/**
	 * @author @Oleksandr Palonnyi
	 * CSS selector for the container to restore `movedEl` into after PiP closes.
	 * Use when a `<Teleport>` or route navigation can change `el.parentNode`
	 * between sessions, making the captured parent stale.
	 *
	 * [WTEL-9774](https://webitel.atlassian.net/browse/WTEL-9774)
	 */
	containerSelector?: string;
}

export function useDocumentPiP(
	element: MaybeRefOrGetter<HTMLElement | null | undefined>,
	options?: UseDocumentPiPOptions,
) {
	const isPiP = ref(false);
	const isSupported = computed(() => 'documentPictureInPicture' in window);

	let pipWindow: Window | null = null;
	let movedEl: HTMLElement | null = null;
	let domAnchor: Comment | null = null;

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

	const clearData = () => {
		mediaSnapshot.splice(0);
		movedEl = null;
		domAnchor = null;
	};

	const restoreElement = () => {
		if (!movedEl) {
			clearData();
			return;
		}

		const explicitContainer = options?.containerSelector
			? document.querySelector(options.containerSelector)
			: null;

		if (explicitContainer) {
			explicitContainer.appendChild(movedEl);
		} else if (domAnchor?.parentNode) {
			domAnchor.parentNode.insertBefore(movedEl, domAnchor);
		}

		domAnchor?.remove();

		restoreMedia(mediaSnapshot);
		resumePlayback(movedEl, mediaSnapshot);

		movedEl = null;
		domAnchor = null;
	};

	const onPiPWindowClose = () => {
		stopPlaybackRetry();
		stopPiPResizeObserver();
		restoreElement();
		pipWindow = null;
		isPiP.value = false;
	};

	const enterPiP = async (width = 480, height = 320) => {
		if (!isSupported.value || isPiP.value) return;

		const el = toValue(element);
		if (!el) return;

		const api = (window as DocumentPiPWindow).documentPictureInPicture;
		let win: Window;
		try {
			win = await api.requestWindow({
				width,
				height,
			});
		} catch {
			return;
		}

		pipWindow = win;

		copyStyles(win);
		win.document.body.style.cssText =
			'margin:0;overflow:hidden;width:100%;height:100%;';
		bridgeCustomElements(el, win);

		/**
		 * @author @Oleksandr Palonnyi
		 *
		 * A comment node placed before `el` acts as a live position bookmark.
		 * It travels with its DOM subtree, so if a `<Teleport>` or route
		 * navigation re-parents the tree while PiP is open, `domAnchor.parentNode`
		 * still points to the correct restore target — unlike a static
		 * `parentNode + nextSibling` snapshot which becomes stale.
		 *
		 * [WTEL-9774](https://webitel.atlassian.net/browse/WTEL-9774)
		 */
		domAnchor = document.createComment('document-pip-anchor');
		el.parentNode.insertBefore(domAnchor, el);
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
		exitPiP();
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
