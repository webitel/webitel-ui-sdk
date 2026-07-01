import { onUnmounted, type Ref } from 'vue';

export const useMediaScroll = (
	element: Ref<HTMLElement | null>,
	onMediaLoaded: () => void,
) => {
	let observer: MutationObserver | null = null;

	const observeImages = (img: HTMLImageElement) => {
		if (img.complete) return;
		img.addEventListener('load', () => onMediaLoaded(), {
			once: true,
		});
	};

	const startObserving = () => {
		if (!element.value) return;

		element.value.querySelectorAll('img').forEach(observeImages);

		observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node instanceof HTMLImageElement) {
						observeImages(node);
					}
					if (node instanceof HTMLElement) {
						node.querySelectorAll('img').forEach(observeImages);
					}
				});
			});
		});

		observer.observe(element.value, {
			childList: true,
			subtree: true,
		});
	};

	const stopObserving = () => {
		observer?.disconnect();
		observer = null;
	};

	onUnmounted(stopObserving);

	return {
		startObserving,
		stopObserving,
	};
};
