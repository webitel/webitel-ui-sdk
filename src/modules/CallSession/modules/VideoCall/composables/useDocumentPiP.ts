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

	const resumePlayback = (root: Element) => {
		collectMedia(root).forEach(safePlay);
	};

	let retryTimer: number | null = null;
	const stopPlaybackRetry = () => {
		if (retryTimer !== null) {
			clearInterval(retryTimer);
			retryTimer = null;
		}
	};

	const retryPlayback = (root: Element, durationMs = 3000) => {
		stopPlaybackRetry();
		const started = performance.now();
		retryTimer = window.setInterval(() => {
			const media = collectMedia(root);
			if (media.length === 0) return;
			media.forEach((el) => {
				el.muted = true;
				if (el.paused) safePlay(el);
			});
			const allPlaying = media.every((el) => !el.paused);
			if (allPlaying || performance.now() - started > durationMs) {
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
		console.log('restoreElement', movedEl, originalParent, originalNextSibling);
		if (!movedEl || !originalParent) {
			restoreMuteMedia();
			movedEl = null;
			originalParent = null;
			originalNextSibling = null;
			return;
		}

		if (
			originalNextSibling &&
			originalNextSibling.parentNode === originalParent
		) {
			console.log('here 1');

			originalParent.insertBefore(movedEl, originalNextSibling);
		}

		restoreMuteMedia();
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
		win.document.body.appendChild(el);
		resumePlayback(el);
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
