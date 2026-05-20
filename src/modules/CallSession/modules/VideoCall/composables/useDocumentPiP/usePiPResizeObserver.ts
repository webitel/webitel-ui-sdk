import type { PiPResizeCallback } from '../../types/types';

export function usePiPResizeObserver() {
	const resizeCallbacks = new Set<PiPResizeCallback>();
	let pipResizeObserver: ResizeObserver | null = null;

	const startPiPResizeObserver = (element: HTMLElement) => {
		pipResizeObserver?.disconnect();
		pipResizeObserver = new ResizeObserver(([entry]) => {
			for (const callback of resizeCallbacks) callback(entry.contentRect);
		});
		pipResizeObserver.observe(element);
	};

	const stopPiPResizeObserver = () => {
		pipResizeObserver?.disconnect();
		pipResizeObserver = null;
	};

	const onPiPResize = (callback: PiPResizeCallback) => {
		resizeCallbacks.add(callback);
		return () => resizeCallbacks.delete(callback);
	};

	return {
		startPiPResizeObserver,
		stopPiPResizeObserver,
		onPiPResize,
	};
}
