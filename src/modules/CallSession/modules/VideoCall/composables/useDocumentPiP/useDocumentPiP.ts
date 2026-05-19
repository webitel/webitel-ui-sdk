import { computed, onUnmounted, ref } from 'vue';

import type { DocumentPiPWindow, MediaSnapshot } from '../../types/types';

import { bridgeCustomElements } from './bridgeCustomElements';
import { copyStyles } from './copyStyles';
import { collectMedia, safePlay } from './mediaCollection';
import { resumePlayback } from './mediaPlayback';
import { restoreMedia, restoreStreams, snapshotMedia } from './mediaSnapshot';
import { createPlaybackRetry } from './playbackRetry';

export function useDocumentPiP(
	getElement: () => HTMLElement | null | undefined,
) {
	const isPiP = ref(false);
	const isSupported = computed(() => 'documentPictureInPicture' in window);

	let pipWindow: Window | null = null;
	let movedEl: HTMLElement | null = null;
	let originalParent: Node | null = null;
	let originalNextSibling: Node | null = null;

	const mediaSnapshot: MediaSnapshot[] = [];
	const { retryPlayback, stopPlaybackRetry } =
		createPlaybackRetry(mediaSnapshot);

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
		if (!movedEl || !originalParent) {
			mediaSnapshot.splice(0);
			movedEl = null;
			originalParent = null;
			originalNextSibling = null;
			return;
		}

		if (
			originalNextSibling &&
			originalNextSibling.parentNode === originalParent
		) {
			originalParent.insertBefore(movedEl, originalNextSibling);
		}

		restoreMedia(mediaSnapshot);
		resumePlayback(movedEl, mediaSnapshot);

		movedEl = null;
		originalParent = null;
		originalNextSibling = null;
	};

	const onPiPWindowClose = () => {
		stopPlaybackRetry();
		restoreElement();
		pipWindow = null;
		isPiP.value = false;
	};

	const enterPiP = async (width = 480, height = 320) => {
		if (!isSupported.value || isPiP.value) return;

		const el = getElement();
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

		originalParent = el.parentNode;
		originalNextSibling = el.nextSibling;
		movedEl = el;

		snapshotMedia(el, mediaSnapshot);
		win.document.body.appendChild(el);

		restoreStreams(mediaSnapshot);
		collectMedia(el).forEach(safePlay);

		retryPlayback(el);
		armFirstGestureResume(win);

		isPiP.value = true;
		win.addEventListener('pagehide', onPiPWindowClose);
	};

	const exitPiP = () => {
		if (!isPiP.value) return;

		stopPlaybackRetry();
		restoreElement();

		if (pipWindow && !pipWindow.closed) {
			pipWindow.removeEventListener('pagehide', onPiPWindowClose);
			pipWindow.close();
		}

		pipWindow = null;
		isPiP.value = false;
	};

	onUnmounted(() => {
		if (isPiP.value) exitPiP();
	});

	return {
		isPiP,
		isSupported,
		enterPiP,
		exitPiP,
		armFirstGestureResume,
	};
}
