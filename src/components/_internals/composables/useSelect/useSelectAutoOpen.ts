import { onBeforeUnmount, type Ref } from 'vue';

import type { SelectComponentRef } from './types';

/** ~500ms at 60fps — opens anyway if something animates without end. */
const MAX_SETTLE_FRAMES = 30;

/** `getAnimations()` marks the real end; polling geometry reads a lull mid-animation as one. */
const waitForAncestorAnimations = async (el: HTMLElement) => {
	const animations: Animation[] = [];
	let node: HTMLElement | null = el;

	while (node) {
		if (typeof node.getAnimations === 'function') {
			animations.push(...node.getAnimations());
		}
		node = node.parentElement;
	}

	if (!animations.length) return;

	await Promise.all(
		animations.map((animation) => animation.finished.catch(() => undefined)),
	);
};

/**
 * Opens the dropdown (`autoOpen`) only once the select has stopped moving.
 *
 * In a popover the trigger keeps shifting through the 300ms enter animation,
 * and primevue aligns the overlay to the trigger's rect — open too early and
 * the dropdown sits in the wrong place until it snaps. The options half is the
 * caller's: `useSelect` calls this after the first fetch resolves.
 *
 * [WTEL-10353](https://webitel.atlassian.net/browse/WTEL-10353)
 */
export const useSelectAutoOpen = (
	autoOpen: (() => boolean | undefined) | undefined,
	selectRef: Ref<SelectComponentRef | undefined>,
) => {
	let rafId: number | null = null;
	let isCancelled = false;

	const cancel = () => {
		isCancelled = true;
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};

	const waitForSettledRect = () =>
		new Promise<void>((resolve) => {
			let previousRect: DOMRect | undefined;
			let frames = 0;

			const step = () => {
				rafId = null;
				if (isCancelled) return;

				const el = selectRef.value?.$el;
				if (!el) return;

				const rect = el.getBoundingClientRect();
				const isSettled =
					!!previousRect &&
					rect.top === previousRect.top &&
					rect.left === previousRect.left &&
					rect.width === previousRect.width &&
					rect.height === previousRect.height;

				if (isSettled || ++frames >= MAX_SETTLE_FRAMES) {
					resolve();
					return;
				}

				previousRect = rect;
				rafId = requestAnimationFrame(step);
			};

			rafId = requestAnimationFrame(step);
		});

	const openWhenSettled = async () => {
		if (!autoOpen?.()) return;

		const el = selectRef.value?.$el;
		if (!el) return;

		isCancelled = false;

		await waitForAncestorAnimations(el);
		if (isCancelled) return;

		await waitForSettledRect();
		if (isCancelled) return;

		selectRef.value?.show?.();
	};

	onBeforeUnmount(cancel);

	return {
		openWhenSettled,
	};
};
