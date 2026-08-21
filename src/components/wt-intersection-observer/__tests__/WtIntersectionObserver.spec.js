import { shallowMount } from '@vue/test-utils';

import WtIntersectionObserver from '../wt-intersection-observer.vue';

describe('WtIntersectionObserver', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtIntersectionObserver);
		expect(wrapper.exists()).toBe(true);
	});

	it('does not render a loader by default', () => {
		const wrapper = shallowMount(WtIntersectionObserver);
		expect(
			wrapper
				.findComponent({
					name: 'wt-loader',
				})
				.exists(),
		).toBe(false);
	});

	it('renders a loader when loading is true', () => {
		const wrapper = shallowMount(WtIntersectionObserver, {
			props: {
				loading: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-loader',
				})
				.exists(),
		).toBe(true);
	});
});
