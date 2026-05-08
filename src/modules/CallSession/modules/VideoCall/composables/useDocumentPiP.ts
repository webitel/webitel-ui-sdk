import { MediaRemoteControl } from 'vidstack';
import { computed, onUnmounted, ref } from 'vue';

import type {
	DocumentPiPWindow,
	MediaSnapshot,
	PiPResizeCallback,
} from '../types/types';

/**
 * @author @Palonnyi Oleksandr
 *
 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
 *
 * Depth-first walk of an element tree including shadow roots.
 * The previous implementation used `querySelectorAll('*')` on each shadow root,
 * which returned all descendants flat and then recursed into each one — causing
 * every element to be visited multiple times.  This version does a single
 * recursive descent: visit the element, walk its shadow root children, then
 * walk its light-DOM children.
 */
const walkElementTree = (
	root: Element | ShadowRoot,
	visit: (el: Element) => void,
) => {
	if (root instanceof Element) {
		visit(root);
		if (root.shadowRoot) {
			for (const child of root.shadowRoot.children) {
				walkElementTree(child, visit);
			}
		}
	}
	for (const child of root.children) {
		walkElementTree(child, visit);
	}
};

const safePlay = (el: HTMLMediaElement) => {
	void el.play().catch(() => {});
};

const collectMedia = (root: Element): HTMLMediaElement[] => {
	const list: HTMLMediaElement[] = [];
	walkElementTree(root, (el) => {
		if (el instanceof HTMLMediaElement) list.push(el);
	});
	return list;
};

const collectMediaPlayers = (root: Element): Element[] => {
	const list: Element[] = [];
	walkElementTree(root, (el) => {
		if (el.tagName.toLowerCase() === 'media-player') list.push(el);
	});
	return list;
};

const requestVidstackPlayback = (root: Element) => {
	for (const player of collectMediaPlayers(root)) {
		const remote = new MediaRemoteControl();
		remote.setTarget(player);
		remote.mute();
		remote.play();
	}
};

export function useDocumentPiP(
	getElement: () => HTMLElement | null | undefined,
) {
	const isPiP = ref(false);
	const isSupported = computed(() => 'documentPictureInPicture' in window);

	let pipWindow: Window | null = null;
	let movedEl: HTMLElement | null = null;
	let originalParent: Node | null = null;
	let originalNextSibling: Node | null = null;

	const resizeCallbacks = new Set<PiPResizeCallback>();
	let pipResizeObserver: ResizeObserver | null = null;

	const startPiPResizeObserver = (el: HTMLElement) => {
		pipResizeObserver?.disconnect();
		pipResizeObserver = new ResizeObserver(([entry]) => {
			for (const cb of resizeCallbacks) cb(entry.contentRect);
		});
		pipResizeObserver.observe(el);
	};

	const stopPiPResizeObserver = () => {
		pipResizeObserver?.disconnect();
		pipResizeObserver = null;
	};

	const onPiPResize = (cb: PiPResizeCallback) => {
		resizeCallbacks.add(cb);
		return () => resizeCallbacks.delete(cb);
	};

	/** Snapshot of every media element taken before the DOM move. */
	let mediaSnapshot: MediaSnapshot[] = [];

	const copyStyles = (targetWindow: Window) => {
		for (const sheet of Array.from(document.styleSheets)) {
			try {
				const style = targetWindow.document.createElement('style');
				style.textContent = Array.from(sheet.cssRules)
					.map((r) => r.cssText)
					.join('');
				targetWindow.document.head.appendChild(style);
			} catch {
				if (sheet.href) {
					const link = targetWindow.document.createElement('link');
					link.rel = 'stylesheet';
					link.href = sheet.href;
					targetWindow.document.head.appendChild(link);
				}
			}
		}
	};

	const bridgeCustomElements = (root: Element, targetWindow: Window) => {
		const tags = new Set<string>();
		walkElementTree(root, (el) => {
			const tag = el.tagName.toLowerCase();
			if (tag.includes('-')) tags.add(tag);
		});

		for (const tag of tags) {
			const ctor = window.customElements.get(tag);
			if (!ctor || targetWindow.customElements.get(tag)) continue;
			try {
				targetWindow.customElements.define(
					tag,
					ctor as CustomElementConstructor,
				);
			} catch (err) {
				console.warn('[document PiP] custom element bridge failed', tag, err);
			}
		}
	};
	/**
	 * @author @Palonnyi Oleksandr
	 *
	 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
	 *
	 * Captures muted state and srcObject of every media element, then mutes them
	 * all.  Must be called before the DOM move: the PiP window's autoplay policy
	 * requires media to be muted, and we need the original values to restore later.
	 */
	const snapshotMedia = (root: Element) => {
		mediaSnapshot = collectMedia(root).map((el) => ({
			el,
			muted: el.muted,
			srcObject: el.srcObject instanceof MediaStream ? el.srcObject : null,
		}));
		for (const { el } of mediaSnapshot) {
			el.muted = true;
			el.setAttribute('muted', '');
			el.defaultMuted = true;
		}
	};

	/**
	 * @author @Palonnyi Oleksandr
	 *
	 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
	 *
	 * Restores muted state and srcObject from the snapshot and clears it.
	 * Call on PiP exit after the element is back in the original document.
	 */
	const restoreMedia = () => {
		for (const { el, muted, srcObject } of mediaSnapshot) {
			el.muted = muted;
			if (!el.srcObject && srcObject) el.srcObject = srcObject;
		}
		mediaSnapshot = [];
	};

	/**
	 * @author @Palonnyi Oleksandr
	 *
	 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
	 *
	 * Re-applies captured srcObjects without clearing the snapshot.
	 * Vidstack's `connectedCallback` fires synchronously on `appendChild` and
	 * may clear `srcObject` during player re-initialization in the new document.
	 * Called on every retry tick to recover from that.
	 */
	const restoreStreams = () => {
		for (const { el, srcObject } of mediaSnapshot) {
			if (!el.srcObject && srcObject) el.srcObject = srcObject;
		}
	};
	const resumePlayback = (root: Element) => {
		restoreStreams();
		collectMedia(root).forEach(safePlay);
		requestVidstackPlayback(root);
	};

	let retryTimer: number | null = null;
	let vidstackDelayTimer: number | null = null;

	const stopPlaybackRetry = () => {
		if (retryTimer !== null) {
			clearInterval(retryTimer);
			retryTimer = null;
		}
		if (vidstackDelayTimer !== null) {
			clearTimeout(vidstackDelayTimer);
			vidstackDelayTimer = null;
		}
	};

	/**
	 * @author @Palonnyi Oleksandr
	 *
	 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
	 *
	 * Polls every 200 ms until every media element is playing with metadata, or
	 * the timeout expires.  `requestVidstackPlayback` is intentionally delayed
	 * 800 ms: calling it on every tick re-triggers Vidstack's load cycle which
	 * calls `load()` and cancels any in-flight `play()` Promise.  The delay lets
	 * `connectedCallback` async work settle before we touch Vidstack's API.
	 */
	const retryPlayback = (root: Element, durationMs = 10000) => {
		stopPlaybackRetry();
		const started = performance.now();

		vidstackDelayTimer = window.setTimeout(() => {
			vidstackDelayTimer = null;
			requestVidstackPlayback(root);
		}, 800);

		retryTimer = window.setInterval(() => {
			restoreStreams();

			const media = collectMedia(root);
			if (!media.length) return;

			for (const el of media) {
				el.muted = true;
				if (el.paused || el.readyState === 0) safePlay(el);
			}

			const allReady = media.every((el) => !el.paused && el.readyState > 0);
			if (allReady || performance.now() - started > durationMs) {
				stopPlaybackRetry();
			}
		}, 200);
	};
	/**
	 * @author @Palonnyi Oleksandr
	 *
	 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
	 *
	 * Last-resort fallback: resumes playback on the first user interaction inside
	 * the PiP window if all automatic attempts fail.  A user gesture guarantees
	 * the browser's autoplay policy is satisfied.
	 */
	const armFirstGestureResume = (w?: Window) => {
		const target = w ?? pipWindow;
		if (!target || target.closed) return;

		const kick = () => {
			if (movedEl) resumePlayback(movedEl);
			target.document.removeEventListener('pointerdown', kick, true);
			target.document.removeEventListener('keydown', kick, true);
		};
		target.document.addEventListener('pointerdown', kick, true);
		target.document.addEventListener('keydown', kick, true);
	};

	const restoreElement = () => {
		if (!movedEl || !originalParent) {
			mediaSnapshot = [];
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

		restoreMedia();
		resumePlayback(movedEl);

		movedEl = null;
		originalParent = null;
		originalNextSibling = null;
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

		snapshotMedia(el);
		win.document.body.appendChild(el);

		/**
		 * @author @Palonnyi Oleksandr
		 *
		 * [WTEL-9414](https://webitel.atlassian.net/browse/WTEL-9414)
		 *
		 * Immediate native play without Vidstack API: `connectedCallback` fires
		 * synchronously on `appendChild` and may start async work (e.g. `load()`)
		 * that cancels an in-flight `play()` Promise if we call Vidstack here.
		 * `retryPlayback` covers subsequent attempts; its 800 ms delayed
		 * `requestVidstackPlayback` fires once that async work has settled.
		 */
		restoreStreams();
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

	onUnmounted(() => {
		if (isPiP.value) exitPiP();
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
