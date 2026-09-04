import { shallowMount } from '@vue/test-utils';

import WtProgressBar from '../wt-progress-bar.vue';

describe('WtProgressBar', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtProgressBar);
		expect(wrapper.exists()).toBe(true);
	});
	it('isOverflow correctly computes overflow=true', () => {
		const wrapper = shallowMount(WtProgressBar, {
			props: {
				value: 2,
				max: 1,
			},
		});
		expect(wrapper.vm.isOverflow).toBe(true);
	});
	it('isOverflow correctly computes overflow=false', () => {
		const wrapper = shallowMount(WtProgressBar, {
			props: {
				value: 0.99,
				max: 1,
			},
		});
		expect(wrapper.vm.isOverflow).toBe(false);
	});

	it('clamps progress width to 100% when value exceeds max', () => {
		const wrapper = shallowMount(WtProgressBar, {
			props: {
				value: 150,
				max: 100,
			},
		});
		expect(wrapper.find('.wt-progress-bar__progress').attributes('style')).toBe(
			'width: 100%;',
		);
		expect(wrapper.classes()).toContain('wt-progress-bar--overflow');
	});

	it('computes progress width as a percentage when not overflowing', () => {
		const wrapper = shallowMount(WtProgressBar, {
			props: {
				value: 25,
				max: 50,
			},
		});
		expect(wrapper.find('.wt-progress-bar__progress').attributes('style')).toBe(
			'width: 50%;',
		);
	});

	it('applies the color modifier class', () => {
		const wrapper = shallowMount(WtProgressBar, {
			props: {
				color: 'error',
			},
		});
		expect(wrapper.classes()).toContain('wt-progress-bar--error');
	});
});
