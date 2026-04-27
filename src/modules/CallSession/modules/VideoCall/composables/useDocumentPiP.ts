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
 * Opens a Document Picture-in-Picture window containing the SAME Vue
 * component tree that is already rendered in the main page (e.g. a full
 * `<video-call>` with vidstack chrome) by moving its root DOM node.
 *
 * Three things must be handled for this to work reliably:
 *
 * 1. **Custom-element definitions** — vidstack uses Web Components
 *    (`<media-player>`, etc.) registered on the main window's
 *    `customElements` registry. The PiP window gets its own, empty
 *    registry. If definitions aren't ported the elements render as
 *    unknown/black when `connectedCallback` runs in the PiP doc. We walk
 *    the tree before moving and bridge each hyphenated tag name.
 *
 * 2. **Autoplay policy** — the PiP document has no transient user
 *    activation right after adoption, so `HTMLMediaElement.play()` calls
 *    (our own and vidstack's internal) reject with `NotAllowedError`. We
 *    force-mute all media before the move (muted autoplay is always
 *    allowed), swallow any remaining uncaught rejections with a scoped
 *    `unhandledrejection` guard, and arm a one-shot gesture listener in
 *    the PiP window to unmute on first user interaction.
 *
 * 3. **Styles** — the PiP document is blank. We clone every stylesheet
 *    from the main document so the moved subtree still looks correct.
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
		[
			...document.styleSheets,
		].forEach((sheet) => {
			try {
				const style = targetWindow.document.createElement('style');
				style.textContent = [
					...sheet.cssRules,
				]
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

	/**
	 * Walks the subtree (and any shadow roots) collecting every custom-element
	 * tag name (those with a dash). For each tag, looks up its constructor in
	 * the main window's `customElements` registry and defines it on the PiP
	 * window's registry — so adopted elements get their upgrade machinery
	 * available under the new document.
	 */
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
					console.warn('[PiP] failed to bridge custom element', tag, err);
				}
			}
		});
		console.log('[PiP] bridged custom elements:', [
			...tags,
		]);
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

	/**
	 * After element adoption the video may need a few beats before it's
	 * ready to play (canplay has to re-fire, vidstack's reactive cycle may
	 * re-set `muted`, etc.). Poll every 200 ms for up to 3 s and re-call
	 * play on any paused media. The element is muted here so autoplay
	 * policy permits this regardless of user activation.
	 */
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
		console.log(
			'[PiP] enterPiP START. supported?',
			isSupported.value,
			'isPiP?',
			isPiP.value,
		);
		if (!isSupported.value || isPiP.value) return;

		const el = getElement();
		console.log('[PiP] element to move:', el);
		if (!el) {
			console.error('[PiP] no element to move');
			return;
		}

		try {
			pipWindow = await (
				window as DocumentPiPWindow
			).documentPictureInPicture.requestWindow({
				width,
				height,
			});
			console.log('[PiP] requestWindow resolved');
		} catch (err) {
			console.error('[PiP] requestWindow REJECTED:', err);
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
		console.log('[PiP] element moved to pip doc');
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
		console.log(
			'[PiP] togglePiP. isPiP:',
			isPiP.value,
			'supported:',
			isSupported.value,
		);
		if (isPiP.value) {
			exitPiP();
		} else {
			enterPiP().catch((err) => console.error('[PiP] enterPiP threw:', err));
		}
	};

	const resumePlaybackPublic = () => {
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
		resumePlayback: resumePlaybackPublic,
	};
}
