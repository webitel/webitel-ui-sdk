// Debounced resize handling on the wave mount; replaces WaveSurfer’s inner scroll observer (relies on non-public renderer APIs).
import type WaveSurfer from 'wavesurfer.js';

type RendererResizeInternals = {
	resizeObserver?: ResizeObserver | null;
	lastContainerWidth: number;
	reRender: () => void;
	emit: (event: 'resize') => void;
};

type ResizeStabilizerOptions = {
	mountResizeWidthEpsPx?: number;
	suppressMountResizeAfterZoomMs?: number;
	debounceMs?: number;
};

const DEFAULT_OPTIONS: Required<ResizeStabilizerOptions> = {
	mountResizeWidthEpsPx: 4,
	suppressMountResizeAfterZoomMs: 650,
	debounceMs: 150,
};

export function useWaveSurferResizeStabilizer(
	waveSurferInstance: WaveSurfer,
	mountElement: HTMLElement,
	options: ResizeStabilizerOptions = {},
): () => void {
	const { mountResizeWidthEpsPx, suppressMountResizeAfterZoomMs, debounceMs } =
		{
			...DEFAULT_OPTIONS,
			...options,
		};

	const renderer =
		waveSurferInstance.getRenderer() as unknown as RendererResizeInternals;
	if (renderer.resizeObserver) {
		renderer.resizeObserver.disconnect();
		renderer.resizeObserver = null;
	}
	renderer.lastContainerWidth = mountElement.clientWidth;

	let suppressMountResizeUntil = 0;
	const unsubscribeZoomListener = waveSurferInstance.on('zoom', () => {
		suppressMountResizeUntil = Date.now() + suppressMountResizeAfterZoomMs;
		requestAnimationFrame(() => {
			renderer.lastContainerWidth = mountElement.clientWidth;
		});
	});

	let resizeDebounceTimer: ReturnType<typeof setTimeout> | null = null;
	let windowResizeDebounceTimer: ReturnType<typeof setTimeout> | null = null;

	const applyMeaningfulWidthResize = () => {
		if (Date.now() < suppressMountResizeUntil) {
			return;
		}
		const mountClientWidth = mountElement.clientWidth;
		if (
			Math.abs(mountClientWidth - renderer.lastContainerWidth) <
			mountResizeWidthEpsPx
		) {
			return;
		}
		renderer.lastContainerWidth = mountClientWidth;
		renderer.reRender();
		renderer.emit('resize');
	};

	const mountResizeObserver = new ResizeObserver(() => {
		if (resizeDebounceTimer) {
			clearTimeout(resizeDebounceTimer);
		}
		resizeDebounceTimer = setTimeout(() => {
			resizeDebounceTimer = null;
			applyMeaningfulWidthResize();
		}, debounceMs);
	});
	mountResizeObserver.observe(mountElement);

	const onWindowResize = () => {
		if (windowResizeDebounceTimer) {
			clearTimeout(windowResizeDebounceTimer);
		}
		windowResizeDebounceTimer = setTimeout(() => {
			windowResizeDebounceTimer = null;
			applyMeaningfulWidthResize();
		}, debounceMs);
	};
	window.addEventListener('resize', onWindowResize);

	return () => {
		unsubscribeZoomListener();
		if (resizeDebounceTimer) {
			clearTimeout(resizeDebounceTimer);
		}
		if (windowResizeDebounceTimer) {
			clearTimeout(windowResizeDebounceTimer);
		}
		mountResizeObserver.disconnect();
		window.removeEventListener('resize', onWindowResize);
	};
}
