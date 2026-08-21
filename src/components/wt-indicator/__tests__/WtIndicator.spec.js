import { shallowMount } from '@vue/test-utils';

import WtIndicator from '../wt-indicator.vue';

describe('WtIndicator', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtIndicator);
		expect(wrapper.classes('wt-indicator')).toBe(true);
	});

	it('renders a component text, if passed', () => {
		const content = 'Hello there!';
		const wrapper = shallowMount(WtIndicator, {
			props: {
				text: content,
			},
		});
		expect(wrapper.find('.wt-indicator__text').text()).toEqual(content);
	});

	it('changed indicator color, if prop is passed', () => {
		const wrapper = shallowMount(WtIndicator, {
			props: {
				color: 'primary',
			},
		});
		expect(wrapper.find('.wt-indicator__indicator').classes()).toContain(
			'wt-indicator__indicator--primary',
		);
	});

	it('does not render text when text prop is not passed', () => {
		const wrapper = shallowMount(WtIndicator);
		expect(wrapper.find('.wt-indicator__text').exists()).toBe(false);
	});

	it('renders numeric text values', () => {
		const wrapper = shallowMount(WtIndicator, {
			props: {
				text: 0,
			},
		});
		expect(wrapper.find('.wt-indicator__text').text()).toBe('0');
	});

	it('applies the size modifier class', () => {
		const wrapper = shallowMount(WtIndicator, {
			props: {
				size: 'sm',
			},
		});
		expect(wrapper.classes()).toContain('wt-indicator--size-sm');
	});
});
