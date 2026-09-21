import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import type { SelectComponentRef } from '../types';
import { useSelectAutoOpen } from '../useSelectAutoOpen';

const useFakeRaf = () => {
	const queue: FrameRequestCallback[] = [];

	vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
		queue.push(cb);
		return queue.length;
	});
	vi.stubGlobal('cancelAnimationFrame', vi.fn());

	return {
		flushFrame: async () => {
			const pending = queue.splice(0, queue.length);
			for (const cb of pending) cb(0);
			await flushPromises();
		},
		pendingFrames: () => queue.length,
	};
};

const setup = ({
	autoOpen = true,
	rects = [
		{},
	] as Array<Partial<DOMRect>>,
	animations = [] as Animation[],
} = {}) => {
	const show = vi.fn();
	let call = 0;

	const el = {
		getAnimations: () => animations,
		parentElement: null,
		getBoundingClientRect: () =>
			({
				top: 0,
				left: 0,
				width: 100,
				height: 20,
				...rects[Math.min(call++, rects.length - 1)],
			}) as DOMRect,
	} as unknown as HTMLElement;

	const selectRef = ref<SelectComponentRef | undefined>({
		show,
		$el: el,
	});

	let openWhenSettled = async () => {};

	const wrapper = mount(
		defineComponent({
			setup() {
				({ openWhenSettled } = useSelectAutoOpen(() => autoOpen, selectRef));
				return () => null;
			},
		}),
	);

	return {
		show,
		wrapper,
		open: async () => {
			void openWhenSettled();
			await flushPromises();
		},
	};
};

const neverEndingAnimation = () =>
	({
		finished: new Promise<void>(() => {}),
	}) as unknown as Animation;

describe('useSelectAutoOpen', () => {
	it('schedules nothing when autoOpen is off', async () => {
		const raf = useFakeRaf();
		const { show, open } = setup({
			autoOpen: false,
		});

		await open();

		expect(raf.pendingFrames()).toBe(0);
		expect(show).not.toHaveBeenCalled();
	});

	it('does not open while an ancestor animation is still running', async () => {
		const raf = useFakeRaf();
		const { show, open } = setup({
			animations: [
				neverEndingAnimation(),
			],
		});

		await open();
		await raf.flushFrame();
		await raf.flushFrame();

		expect(show).not.toHaveBeenCalled();
	});

	it('opens once the ancestor animation resolves and the rect is stable', async () => {
		const raf = useFakeRaf();
		const { show, open } = setup({
			animations: [
				{
					finished: Promise.resolve(),
				} as unknown as Animation,
			],
			rects: [
				{
					top: 10,
				},
			],
		});

		await open();

		await raf.flushFrame();
		expect(show).not.toHaveBeenCalled();

		await raf.flushFrame();
		expect(show).toHaveBeenCalledTimes(1);
	});

	it('keeps waiting while the trigger is still moving', async () => {
		const raf = useFakeRaf();
		const { show, open } = setup({
			rects: [
				{
					top: 0,
				},
				{
					top: 40,
				},
				{
					top: 70,
				},
				{
					top: 80,
				},
				{
					top: 80,
				},
			],
		});

		await open();

		await raf.flushFrame();
		await raf.flushFrame();
		await raf.flushFrame();
		await raf.flushFrame();
		expect(show).not.toHaveBeenCalled();

		await raf.flushFrame();
		expect(show).toHaveBeenCalledTimes(1);
	});

	it('gives up waiting and opens after the frame cap', async () => {
		const raf = useFakeRaf();
		const { show, open } = setup({
			rects: Array.from(
				{
					length: 40,
				},
				(_, i) => ({
					top: i * 3,
				}),
			),
		});

		await open();
		for (let i = 0; i < 30; i += 1) await raf.flushFrame();

		expect(show).toHaveBeenCalledTimes(1);
	});

	it('stops waiting when the select unmounts', async () => {
		const raf = useFakeRaf();
		const { show, wrapper, open } = setup({
			rects: [
				{
					top: 0,
				},
				{
					top: 40,
				},
			],
		});

		await open();
		await raf.flushFrame();
		wrapper.unmount();
		await raf.flushFrame();

		expect(show).not.toHaveBeenCalled();
	});
});
