import { computed, onUnmounted, ref } from 'vue';

type DocumentPiPWindow = Window &
	typeof globalThis & {
		documentPictureInPicture: {
			requestWindow: (opts: {
				width: number;
				height: number;
			}) => Promise<Window>;
		};
	};

/**
 * Document Picture-in-Picture (Chrome): moves an existing DOM subtree into a
 * small auxiliary window so the same Vue/Vidstack tree keeps running.
 *
 * Requires `documentPictureInPicture` and a **user gesture** for
 * `requestWindow()` in typical browser policy — auto-open from data-only
 * watchers may get `NotAllowedError`.
 *
 * Extra work: copy styles (blank PiP doc), bridge custom elements to PiP
 * `customElements`, mute-then-restore around the move for autoplay policy.
 */
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

	const suppressPlayRejection = (ev: PromiseRejectionEvent) => {
		const reason = ev.reason as unknown;
		const name =
			reason instanceof DOMException
				? reason.name
				: (
						reason as {
							name?: string;
						} | null
					)?.name;
		if (name === 'NotAllowedError') ev.preventDefault();
	};

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
		const visit = (node: Element | ShadowRoot) => {
			if ('tagName' in node) {
				const t = (node as Element).tagName.toLowerCase();
				if (t.includes('-')) tags.add(t);
			}
			const sr = (node as Element).shadowRoot;
			if (sr) sr.querySelectorAll('*').forEach((c) => visit(c));
			const children = (node as Element | ShadowRoot).children;
			if (children) Array.from(children).forEach((c) => visit(c));
		};
		visit(root);

		tags.forEach((tag) => {
			const ctor = window.customElements.get(tag);
			if (!ctor) return;
			if (!targetWindow.customElements.get(tag)) {
				try {
					targetWindow.customElements.define(
						tag,
						ctor as CustomElementConstructor,
					);
				} catch (err) {
					console.warn('[document PiP] custom element bridge failed', tag, err);
				}
			}
		});
	};

	const collectMedia = (root: Element): HTMLMediaElement[] => {
		const list: HTMLMediaElement[] = [];
		const visit = (node: Element | ShadowRoot) => {
			if (node instanceof HTMLMediaElement) list.push(node);
			const sr = (node as Element).shadowRoot;
			if (sr) sr.querySelectorAll('*').forEach((c) => visit(c));
			const children = (node as Element | ShadowRoot).children;
			if (children) Array.from(children).forEach((c) => visit(c));
		};
		visit(root);
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
		collectMedia(root).forEach((el) => {
			const p = el.play();
			if (p && typeof p.catch === 'function') p.catch(() => {});
		});
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
				if (el.paused) {
					const p = el.play();
					if (p && typeof p.catch === 'function') p.catch(() => {});
				}
			});
			const allPlaying = media.every((el) => !el.paused);
			if (allPlaying || performance.now() - started > durationMs) {
				stopPlaybackRetry();
			}
		}, 200);
	};

	const armFirstGestureResume = (w: Window) => {
		const kick = () => {
			if (movedEl) resumePlayback(movedEl);
			w.document.removeEventListener('pointerdown', kick, true);
			w.document.removeEventListener('keydown', kick, true);
		};
		w.document.addEventListener('pointerdown', kick, true);
		w.document.addEventListener('keydown', kick, true);
	};

	const restoreElement = () => {
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
			originalParent.insertBefore(movedEl, originalNextSibling);
		} else {
			originalParent.appendChild(movedEl);
		}

		restoreMuteMedia();
		resumePlayback(movedEl);

		movedEl = null;
		originalParent = null;
		originalNextSibling = null;
	};

	const detachGuards = (w: Window | null) => {
		window.removeEventListener('unhandledrejection', suppressPlayRejection);
		if (w && !w.closed) {
			w.removeEventListener('unhandledrejection', suppressPlayRejection);
		}
	};

	const onPiPWindowClose = () => {
		stopPlaybackRetry();
		restoreElement();
		detachGuards(pipWindow);
		pipWindow = null;
		isPiP.value = false;
	};

	const enterPiP = async (width = 480, height = 320) => {
		if (!isSupported.value || isPiP.value) return;

		const el = getElement();
		if (!el) return;

		try {
			pipWindow = await (
				window as DocumentPiPWindow
			).documentPictureInPicture.requestWindow({
				width,
				height,
			});
		} catch {
			return;
		}

		copyStyles(pipWindow);
		pipWindow.document.body.style.cssText =
			'margin:0;overflow:hidden;width:100%;height:100%;';

		bridgeCustomElements(el, pipWindow);

		window.addEventListener('unhandledrejection', suppressPlayRejection);
		pipWindow.addEventListener('unhandledrejection', suppressPlayRejection);

		originalParent = el.parentNode;
		originalNextSibling = el.nextSibling;
		movedEl = el;

		forceMuteMedia(el);
		pipWindow.document.body.appendChild(el);
		resumePlayback(el);
		retryPlayback(el);
		armFirstGestureResume(pipWindow);

		isPiP.value = true;
		pipWindow.addEventListener('pagehide', onPiPWindowClose);
	};

	const exitPiP = () => {
		if (!isPiP.value) return;

		stopPlaybackRetry();
		restoreElement();
		detachGuards(pipWindow);

		if (pipWindow && !pipWindow.closed) {
			pipWindow.removeEventListener('pagehide', onPiPWindowClose);
			pipWindow.close();
		}

		pipWindow = null;
		isPiP.value = false;
	};

	const togglePiP = () => {
		if (isPiP.value) {
			exitPiP();
		} else {
			void enterPiP();
		}
	};

	const resumePlaybackInPiP = () => {
		if (movedEl) resumePlayback(movedEl);
	};

	onUnmounted(() => {
		if (isPiP.value) exitPiP();
	});

	return {
		isPiP,
		isSupported,
		enterPiP,
		togglePiP,
		exitPiP,
		resumePlayback: resumePlaybackInPiP,
	};
}
