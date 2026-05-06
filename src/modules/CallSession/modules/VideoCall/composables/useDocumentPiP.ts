import { MediaRemoteControl } from 'vidstack';
import { computed, onUnmounted, ref } from 'vue';

import type { DocumentPiPWindow } from '../types/types';

const walkElementTree = (
	root: Element | ShadowRoot,
	visit: (el: Element) => void,
) => {
	const step = (node: Element | ShadowRoot) => {
		if (node instanceof Element) visit(node);
		const host = node instanceof Element ? node : undefined;
		const sr = host?.shadowRoot;
		if (sr) sr.querySelectorAll('*').forEach((c) => step(c));
		Array.from(node.children).forEach((c) => step(c));
	};
	step(root);
};

const safePlay = (el: HTMLMediaElement) => {
	void el.play().catch(() => {});
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
	let mutedState: Array<{
		el: HTMLMediaElement;
		muted: boolean;
	}> = [];

	let streamState: Array<{
		el: HTMLMediaElement;
		srcObject: MediaStream | null;
	}> = [];

	const copyStyles = (targetWindow: Window) => {
		Array.from(document.styleSheets).forEach((sheet) => {
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
		});
	};

	const bridgeCustomElements = (root: Element, targetWindow: Window) => {
		const tags = new Set<string>();
		walkElementTree(root, (el) => {
			const t = el.tagName.toLowerCase();
			if (t.includes('-')) tags.add(t);
		});

		tags.forEach((tag) => {
			const ctor = window.customElements.get(tag);
			if (!ctor || targetWindow.customElements.get(tag)) return;
			try {
				targetWindow.customElements.define(
					tag,
					ctor as CustomElementConstructor,
				);
			} catch (err) {
				console.warn('[document PiP] custom element bridge failed', tag, err);
			}
		});
	};

	const collectMedia = (root: Element): HTMLMediaElement[] => {
		const list: HTMLMediaElement[] = [];
		walkElementTree(root, (el) => {
			if (el instanceof HTMLMediaElement) list.push(el);
		});
		return list;
	};

	const forceMuteMedia = (root: Element) => {
		mutedState = collectMedia(root).map((el) => ({
			el,
			muted: el.muted,
		}));
		mutedState.forEach(({ el }) => {
			el.muted = true;
			el.setAttribute('muted', '');
			el.defaultMuted = true;
		});
	};

	const restoreMuteMedia = () => {
		mutedState.forEach(({ el, muted }) => {
			el.muted = muted;
		});
		mutedState = [];
	};

	/**
	 * Snapshot srcObject for every media element **before** the DOM move.
	 * Vidstack's connectedCallback can fire after adoptNode / appendChild and
	 * reset the player, clearing srcObject — restoreStreams puts it back.
	 */
	const captureStreams = (root: Element) => {
		streamState = collectMedia(root).map((el) => ({
			el,
			srcObject: el.srcObject instanceof MediaStream ? el.srcObject : null,
		}));
	};

	const restoreStreams = () => {
		streamState.forEach(({ el, srcObject }) => {
			if (!el.srcObject && srcObject) {
				el.srcObject = srcObject;
			}
		});
	};

	const resumePlayback = (root: Element, withVidstack = true) => {
		restoreStreams();
		collectMedia(root).forEach(safePlay);
		if (withVidstack) requestVidstackPlayback(root);
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

	const retryPlayback = (root: Element, durationMs = 10000) => {
		stopPlaybackRetry();
		const started = performance.now();
		// Fire requestVidstackPlayback once after ~800 ms so Vidstack's connectedCallback
		// async work (which may call load() and cancel an in-flight play() Promise) has
		// settled before we ask Vidstack's request manager to play.
		// Calling it on every 200 ms tick causes Vidstack to re-enter its load cycle
		// each time, which keeps cancelling our safePlay calls.
		vidstackDelayTimer = window.setTimeout(() => {
			vidstackDelayTimer = null;
			requestVidstackPlayback(root);
		}, 800);

		retryTimer = window.setInterval(() => {
			// Restore srcObject first — Vidstack connectedCallback may have cleared it
			restoreStreams();

			const media = collectMedia(root);
			if (media.length === 0) return;
			media.forEach((el) => {
				el.muted = true;
				// Also play when readyState is 0: video has no source yet (stream not yet
				// assigned by Vidstack) — we call play() speculatively so it queues once
				// srcObject is set.
				if (el.paused || el.readyState === 0) safePlay(el);
			});
			// Stop only when the video has both metadata AND is playing, so we don't
			// bail out while readyState is still 0 (no source) with paused falsely false.
			const allReady = media.every((el) => !el.paused && el.readyState > 0);
			if (allReady || performance.now() - started > durationMs) {
				stopPlaybackRetry();
			}
		}, 200);
	};

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
			restoreMuteMedia();
			streamState = [];
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

		restoreMuteMedia();
		streamState = [];
		resumePlayback(movedEl);

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

		forceMuteMedia(el);
		captureStreams(el);
		win.document.body.appendChild(el);
		// withVidstack=false: Vidstack's connectedCallback fires synchronously during
		// appendChild and may start async work (e.g. load()) that cancels any play()
		// Promise we create here. Don't touch Vidstack's request manager yet — the
		// single delayed call inside retryPlayback fires at ~800 ms once that work settles.
		resumePlayback(el, false);
		queueMicrotask(() => {
			resumePlayback(el, false);
		});
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				resumePlayback(el, false);
			});
		});
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
