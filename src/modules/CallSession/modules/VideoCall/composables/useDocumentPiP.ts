import { computed, onUnmounted, ref } from 'vue';

export function useDocumentPiP(getElement: () => HTMLElement | null) {
	const isPiP = ref(false);
	const isSupported = computed(() => 'documentPictureInPicture' in window);

	let pipWindow: Window | null = null;
	let originalParent: Element | null = null;
	let originalNextSibling: ChildNode | null = null;

	/**
	 * Capture MediaStream refs from all video elements BEFORE moving the element
	 * to another document — Vidstack clears srcObject during its connectedCallback re-init.
	 */
	const captureVideoStreams = (
		container: HTMLElement,
	): (MediaStream | null)[] =>
		Array.from(container.querySelectorAll<HTMLVideoElement>('video')).map(
			(video) =>
				video.srcObject instanceof MediaStream ? video.srcObject : null,
		);

	/**
	 * Re-apply captured streams and resume playback.
	 * Retries at increasing delays to outlast Vidstack's async re-init after
	 * the element moves between documents.
	 */
	const refreshVideoPlayback = (
		container: HTMLElement,
		capturedStreams: (MediaStream | null)[] = [],
	) => {
		const attempt = () => {
			container
				.querySelectorAll<HTMLVideoElement>('video')
				.forEach((video, i) => {
					const stream = capturedStreams[i] ?? null;
					if (stream && video.srcObject !== stream) {
						video.srcObject = stream;
					}
					if (video.paused && (video.srcObject || video.src)) {
						video.play().catch(() => {});
					}
					video.play();
				});
		};

		attempt();
		setTimeout(attempt, 100);
		setTimeout(attempt, 400);
	};

	const copyStylesToPiP = (targetWindow: Window) => {
		Array.from(document.styleSheets).forEach((sheet) => {
			if (sheet.ownerNode) {
				targetWindow.document.head.appendChild(sheet.ownerNode.cloneNode(true));
			}
		});
	};

	const enterPiP = async () => {
		if (!isSupported.value || isPiP.value) return;

		const el = getElement();
		if (!el) return;

		const rect = el.getBoundingClientRect();
		const width = Math.round(rect.width) || 320;
		const height = Math.round(rect.height) || 240;

		// Capture streams BEFORE the element leaves the document
		const capturedStreams = captureVideoStreams(el);

		try {
			pipWindow = await (
				window as Window &
					typeof globalThis & {
						documentPictureInPicture: {
							requestWindow: (opts: {
								width: number;
								height: number;
							}) => Promise<Window>;
						};
					}
			).documentPictureInPicture.requestWindow({
				width,
				height,
			});
		} catch {
			return;
		}

		copyStylesToPiP(pipWindow);

		pipWindow.document.body.style.cssText =
			'margin:0;overflow:hidden;width:100%;height:100%;';

		originalParent = el.parentElement;
		originalNextSibling = el.nextSibling as ChildNode | null;

		pipWindow.document.body.appendChild(el);
		isPiP.value = true;

		refreshVideoPlayback(el, capturedStreams);
		pipWindow.addEventListener('pagehide', onPiPWindowClose);
	};

	const exitPiP = () => {
		if (!isPiP.value) return;

		const el = getElement();

		if (el && originalParent) {
			const capturedStreams = captureVideoStreams(el);
			originalParent.insertBefore(el, originalNextSibling ?? null);
			refreshVideoPlayback(el, capturedStreams);
		}

		if (pipWindow && !pipWindow.closed) {
			pipWindow.removeEventListener('pagehide', onPiPWindowClose);
			pipWindow.close();
		}

		pipWindow = null;
		originalParent = null;
		originalNextSibling = null;
		isPiP.value = false;
	};

	const onPiPWindowClose = () => {
		const el = getElement();
		if (el && originalParent) {
			try {
				const capturedStreams = captureVideoStreams(el);
				originalParent.insertBefore(el, originalNextSibling ?? null);
				refreshVideoPlayback(el, capturedStreams);
			} catch {
				// element may be detached if component unmounts simultaneously
			}
		}
		pipWindow = null;
		originalParent = null;
		originalNextSibling = null;
		isPiP.value = false;
	};

	const togglePiP = () => {
		if (isPiP.value) {
			exitPiP();
		} else {
			void enterPiP();
		}
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
	};
}
