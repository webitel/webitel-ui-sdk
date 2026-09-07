import { shallowMount } from '@vue/test-utils';

import WtLoadBar from '../wt-load-bar.vue';

describe('WtLoadBar', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtLoadBar);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders 0% width by default', () => {
		const wrapper = shallowMount(WtLoadBar);
		expect(wrapper.find('.wt-load-bar__progress').attributes('style')).toBe(
			'width: 0%;',
		);
	});

	it('computes progress width as a percentage of value/max', () => {
		const wrapper = shallowMount(WtLoadBar, {
			props: {
				value: 25,
				max: 50,
			},
		});
		expect(wrapper.find('.wt-load-bar__progress').attributes('style')).toBe(
			'width: 50%;',
		);
	});

	// NOTE: progressWidth references `this.isOverflow`, which is never defined
	// (no such data/computed property exists), so it's always undefined/falsy.
	// Progress width is therefore never clamped to 100 and can overflow past
	// it when value > max — documenting the current (likely unintended) behavior.
	it('does not clamp progress width when value exceeds max', () => {
		const wrapper = shallowMount(WtLoadBar, {
			props: {
				value: 150,
				max: 100,
			},
		});
		expect(wrapper.find('.wt-load-bar__progress').attributes('style')).toBe(
			'width: 150%;',
		);
	});

	it('applies the default primary color class', () => {
		const wrapper = shallowMount(WtLoadBar);
		expect(wrapper.classes()).toContain('wt-load-bar--color-primary');
	});

	it('applies a custom color class', () => {
		const wrapper = shallowMount(WtLoadBar, {
			props: {
				color: 'error',
			},
		});
		expect(wrapper.classes()).toContain('wt-load-bar--color-error');
	});
});
