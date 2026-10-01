import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';

import { useObserveHeightUntilStable } from '../useObserveHeightUntilStable';

const observers: Array<{
	disconnect: ReturnType<typeof vi.fn>;
}> = [];

class TrackedResizeObserver {
	disconnect = vi.fn();
	observe = vi.fn();
	unobserve = vi.fn();
	constructor() {
		observers.push(this);
	}
}

describe('useObserveHeightUntilStable', () => {
	afterEach(() => {
		observers.length = 0;
		vi.unstubAllGlobals();
	});

	// a second start (thread switch) must not leave the first observer scrolling forever
	it('stops the previous observer when started again', () => {
		vi.stubGlobal('ResizeObserver', TrackedResizeObserver);
		const target = ref<HTMLElement | null>(document.createElement('div'));
		const Host = defineComponent({
			setup() {
				return useObserveHeightUntilStable(target, () => {}, 2000);
			},
			render: () => h('div'),
		});
		const wrapper = mount(Host);
		const api = wrapper.vm as unknown as {
			startObserve: () => void;
		};

		api.startObserve();
		api.startObserve();

		expect(observers).toHaveLength(2);
		expect(observers[0].disconnect).toHaveBeenCalled();
		wrapper.unmount();
	});
});
